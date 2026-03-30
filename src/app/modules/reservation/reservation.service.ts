import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../../interface/requestUser.interface";
import {
  ICreateReservationPayload,
  IUpdateReservationStatusPayload,
} from "./reservation.interface";
import {
  Prisma,
  ReservationStatus,
  UserRole,
} from "../../../generated/prisma/client";

const CreateReservation = async (
  user: IRequestUser,
  payload: ICreateReservationPayload,
) => {
  const {
    roomId,
    checkInDate,
    checkOutDate,
    adults = 1,
    children = 0,
    roomsBooked = 1,
    extraBed = 0,
    services = [],
  } = payload;

  // user check
  const userExit = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!userExit) {
    throw new AppError(status.BAD_REQUEST, "Request failed wrang user");
  }

  // validate dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkIn >= checkOut) {
    throw new AppError(status.BAD_REQUEST, "Invalid date range");
  }

  const nights =
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);

  // get room
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  if (!room) {
    throw new AppError(status.NOT_FOUND, "Room not found");
  }

  // base room price
  let totalPrice = Number(room.price) * nights * roomsBooked;

  // extra bed price
  if (extraBed > 0) {
    totalPrice += Number(room.extraBedPrice || 0) * extraBed * nights;
  }

  // service price calculation
  const serviceData: any[] = [];

  if (services.length > 0) {
    for (const item of services) {
      const service = await prisma.service.findUnique({
        where: { id: item.serviceId },
      });

      if (!service) {
        throw new AppError(
          status.NOT_FOUND,
          `Service not found: ${item.serviceId}`,
        );
      }

      const quantity = item.quantity ?? 1;

      let serviceCost = 0;

      if (service.type === "PER_NIGHT") {
        serviceCost = Number(service.price) * quantity * nights;
      } else {
        serviceCost = Number(service.price) * quantity * adults;
      }

      totalPrice += serviceCost;

      serviceData.push({
        serviceId: item.serviceId,
        quantity,
      });
    }
  }

  // transaction
  const result = await prisma.$transaction(async (tx) => {
    const newReservation = await tx.reservation.create({
      data: {
        userId: user.userId,
        roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults,
        children,
        roomsBooked,
        extraBed,
        totalPrice: new Prisma.Decimal(totalPrice),
      },
    });

    // attach services
    if (serviceData.length > 0) {
      await tx.reservationService.createMany({
        data: serviceData.map((s) => ({
          reservationId: newReservation.id,
          serviceId: s.serviceId,
          quantity: s.quantity,
        })),
      });
    }

    return newReservation;
  });

  return result;
};

const gestMyReservation = async (user: IRequestUser) => {
  // user check
  const userExit = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!userExit) {
    throw new AppError(status.BAD_REQUEST, "Request failed: wrong user");
  }

  // Determine query based on role
  let reservations;

  if (user.role === UserRole.ADMIN || user.role === UserRole.MANAGER) {
    // Admin / Manager → all reservations
    reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        room: {
          include: {
            images: true,
          },
        },
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    // Normal user → only own reservations
    reservations = await prisma.reservation.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        room: {
          include: {
            images: true,
          },
        },
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return reservations;
};

const getReservationById = async (reservationId: string) => {
  const reservation = await prisma.reservation.findUniqueOrThrow({
    where: {
      id: reservationId,
    },
    include: {
      room: {
        include: {
          images: true,
        },
      },
      payment: true,
      user: true,
    },
  });

  return reservation;
};

const updateReservationStatus = async (
  payload: IUpdateReservationStatusPayload,
  reservationId: string,
) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation)
    throw new AppError(status.NOT_FOUND, "Reservation not found");

  if (reservation.status === ReservationStatus.COMPLETED) {
    throw new AppError(
      status.BAD_REQUEST,
      "Completed reservation cannot be updated",
    );
  }

  return prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: payload.status,
    },
  });
};

const cancelMyReservation = async (
  user: IRequestUser,
  reservationId: string,
) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation)
    throw new AppError(status.NOT_FOUND, "Reservation not found");

  if (reservation.userId !== existUser?.id) {
    throw new AppError(status.FORBIDDEN, "Cannot cancel others reservation");
  }

  if (ReservationStatus.CANCELLED === reservation.status) {
    throw new AppError(status.BAD_REQUEST, "Reservations already cancelled");
  }

  if (ReservationStatus.COMPLETED === reservation.status) {
    throw new AppError(
      status.BAD_REQUEST,
      "Only HOLD or CONFIRMED reservations can be cancelled",
    );
  }

  return prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: ReservationStatus.CANCELLED,
    },
  });
};

export const ReservationService = {
  CreateReservation,
  gestMyReservation,
  getReservationById,
  updateReservationStatus,
  cancelMyReservation,
};
