import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import {
  ICreateCheckinPayload,
  IUpdateCheckinStatusPayload,
} from "./checkin.interface";
import {
  CheckinStatus,
  ReservationStatus,
} from "../../../generated/prisma/enums";

const createCheckin = async (payload: ICreateCheckinPayload) => {
  const { reservationId, notes } = payload;

  // 1. Check reservation exists
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation) {
    throw new AppError(status.NOT_FOUND, "Reservation not found");
  }

  // 2. Must be CONFIRMED (payment done via SSL Commerz)
  if (reservation.status !== ReservationStatus.CONFIRMED) {
    throw new AppError(
      status.BAD_REQUEST,
      "Reservation is not confirmed. Customer must complete payment first.",
    );
  }

  // 3. Prevent duplicate check-in
  const existingCheckin = await prisma.checkin.findUnique({
    where: {
      reservationId: reservation.id,
    },
  });

  if (existingCheckin) {
    throw new AppError(
      status.BAD_REQUEST,
      "Check-in already exists for this reservation.",
    );
  }

  // 4. Create check-in record (starts as PENDING)
  const result = await prisma.checkin.create({
    data: {
      reservationId: reservation.id,
      roomId: reservation.roomId,
      checkinTime: new Date(),
      checkoutTime: new Date(reservation.checkOutDate),
      status: CheckinStatus.PENDING,
      notes,
    },
    include: {
      reservation: true,
      room: true,
    },
  });

  return result;
};

const getsCheckin = async () => {
  const result = await prisma.checkin.findMany({
    include: {
      reservation: true,
      room: {
        include: { images: true },
      },
    },
    orderBy: { checkinTime: "desc" },
  });
  return result;
};

// ✅ NEW: Update check-in status
// Flow: PENDING → CHECKED_IN → CHECKED_OUT
const updateCheckinStatus = async (
  checkinId: string,
  payload: IUpdateCheckinStatusPayload,
) => {
  // 1. Find the check-in
  const checkin = await prisma.checkin.findUnique({
    where: { id: checkinId },
  });

  if (!checkin) {
    throw new AppError(status.NOT_FOUND, "Check-in record not found");
  }

  // 2. Validate status transition
  const allowedTransitions: Record<string, string[]> = {
    PENDING: ["CHECKED_IN"],
    CHECKED_IN: ["CHECKED_OUT"],
    CHECKED_OUT: [], // terminal state
  };

  const allowed = allowedTransitions[checkin.status] ?? [];

  if (!allowed.includes(payload.status)) {
    throw new AppError(
      status.BAD_REQUEST,
      `Cannot transition from ${checkin.status} to ${payload.status}. Allowed next: ${allowed.join(", ") || "none (terminal state)"}`,
    );
  }

  // 3. Build update data
  const updateData: Record<string, unknown> = {
    status: payload.status,
  };

  // Auto-set checkoutTime when guest checks out
  if (payload.status === "CHECKED_OUT") {
    updateData.checkoutTime = new Date();
  }

  const result = await prisma.checkin.update({
    where: { id: checkinId },
    data: updateData,
    include: {
      reservation: true,
      room: true,
    },
  });

  return result;
};

export const CheckinService = {
  createCheckin,
  getsCheckin,
  updateCheckinStatus,
};
