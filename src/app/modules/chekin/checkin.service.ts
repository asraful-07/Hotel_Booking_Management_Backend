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

  // Reservation check
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation) {
    throw new AppError(status.NOT_FOUND, "Reservation not found");
  }

  // Payment  checkin
  if (reservation.status !== ReservationStatus.CONFIRMED) {
    throw new AppError(
      status.BAD_REQUEST,
      "Reservation is not confirmed (payment required)",
    );
  }

  // Already checkin check
  const existingCheckin = await prisma.checkin.findUnique({
    where: {
      reservationId,
    },
  });

  if (existingCheckin) {
    throw new AppError(
      status.BAD_REQUEST,
      "Checkin already completed for this reservation",
    );
  }

  // Create checkin
  const result = await prisma.checkin.create({
    data: {
      reservationId: reservation.id,
      roomId: reservation.roomId,
      checkinTime: new Date(),
      status: CheckinStatus.PENDING,
      notes,
    },
  });

  return result;
};

const getsCheckin = async () => {
  const result = await prisma.checkin.findMany({
    include: {
      reservation: true,
      room: {
        include: {
          images: true,
        },
      },
    },
  });
  return result;
};

const updateCheckinStatus = async (
  payload: IUpdateCheckinStatusPayload,
  id: string,
) => {
  const { status: newStatus } = payload;

  const checkin = await prisma.checkin.findUnique({
    where: {
      id: id,
    },
  });

  if (!checkin) {
    throw new AppError(status.NOT_FOUND, "Checkin not found");
  }

  // Already checked out → no update
  if (checkin.status === CheckinStatus.CHECKED_OUT) {
    throw new AppError(
      status.BAD_REQUEST,
      "Already checked out. Cannot update again",
    );
  }

  // Direct PENDING → CHECKED_OUT block
  if (
    checkin.status === CheckinStatus.PENDING &&
    newStatus === CheckinStatus.CHECKED_OUT
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "Must CHECKED_IN before CHECKED_OUT",
    );
  }

  const updated = await prisma.checkin.update({
    where: {
      id: id,
    },
    data: {
      status: newStatus,

      // checkoutTime only when CHECKED_OUT
      ...(newStatus === CheckinStatus.CHECKED_OUT && {
        checkoutTime: new Date(),
      }),
    },
  });

  return updated;
};

export const CheckinService = {
  createCheckin,
  getsCheckin,
  updateCheckinStatus,
};
