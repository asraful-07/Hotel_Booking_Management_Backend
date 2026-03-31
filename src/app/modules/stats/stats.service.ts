import status from "http-status";
import { UserRole, PaymentStatus } from "../../../generated/prisma/enums";

import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../../interface/requestUser.interface";

const getDashboardStatsData = async (user: IRequestUser) => {
  switch (user.role) {
    case UserRole.ADMIN:
      return getAdminStats();

    case UserRole.MANAGER:
      return getManagerStats(user);

    case UserRole.CUSTOMER:
      return getCustomerStats(user);

    default:
      throw new AppError(status.BAD_REQUEST, "Invalid role");
  }
};

const getAdminStats = async () => {
  const [
    totalReservations,
    totalRooms,
    totalUsers,
    totalPayments,
    totalReviews,
    totalWishlist,
    totalCheckins,
    revenueData,
    reservationStatus,
    checkinStatus,
    pieChart,
    barChart,
  ] = await Promise.all([
    prisma.reservation.count(),
    prisma.room.count(),
    prisma.user.count(),
    prisma.payment.count(),
    prisma.review.count(),
    prisma.wishlist.count(),
    prisma.checkin.count(),

    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: PaymentStatus.SUCCESS,
      },
    }),

    prisma.reservation.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    }),

    prisma.checkin.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    }),

    getPieChartData(),
    getBarChartData(),
  ]);

  return {
    totalReservations,
    totalRooms,
    totalUsers,
    totalPayments,
    totalReviews,
    totalWishlist,
    totalCheckins,
    totalRevenue: revenueData._sum.amount || 0,

    reservationStatus: reservationStatus.map(({ _count, status }) => ({
      status,
      count: _count.id,
    })),

    checkinStatus: checkinStatus.map(({ _count, status }) => ({
      status,
      count: _count.id,
    })),

    pieChart,
    barChart,
  };
};

const getManagerStats = async (user: IRequestUser) => {
  const manager = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  console.log(manager);
  const [roomCount, reservationCount, revenueData, checkinCount, reviewCount] =
    await Promise.all([
      prisma.room.count({
        where: {
          reservations: {
            some: {
              userId: manager.id,
            },
          },
        },
      }),

      prisma.reservation.count({
        where: {
          userId: manager.id,
        },
      }),

      prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: PaymentStatus.SUCCESS,
          reservation: {
            userId: manager.id,
          },
        },
      }),

      prisma.checkin.count({
        where: {
          reservation: {
            userId: manager.id,
          },
        },
      }),

      prisma.review.count({
        where: {
          room: {
            reservations: {
              some: {
                userId: manager.id,
              },
            },
          },
        },
      }),
    ]);

  return {
    roomCount,
    reservationCount,
    checkinCount,
    reviewCount,
    totalRevenue: revenueData._sum.amount || 0,
  };
};

const getCustomerStats = async (user: IRequestUser) => {
  const customer = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const [
    reservationCount,
    wishlistCount,
    reviewCount,
    paymentData,
    reservationStatus,
  ] = await Promise.all([
    prisma.reservation.count({
      where: {
        userId: customer.id,
      },
    }),

    prisma.wishlist.count({
      where: {
        userId: customer.id,
      },
    }),

    prisma.review.count({
      where: {
        userId: customer.id,
      },
    }),

    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: PaymentStatus.SUCCESS,
        reservation: {
          userId: customer.id,
        },
      },
    }),

    prisma.reservation.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
      where: {
        userId: customer.id,
      },
    }),
  ]);

  return {
    reservationCount,
    wishlistCount,
    reviewCount,
    totalSpent: paymentData._sum.amount || 0,

    reservationStatus: reservationStatus.map(({ _count, status }) => ({
      status,
      count: _count.id,
    })),
  };
};

const getPieChartData = async () => {
  const data = await prisma.reservation.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  return data.map(({ _count, status }) => ({
    status,
    count: _count.id,
  }));
};

const getBarChartData = async () => {
  const result = await prisma.$queryRaw`
    SELECT DATE_TRUNC('month', "createdAt") AS month,
    CAST(COUNT(*) AS INTEGER) AS count
    FROM "Reservation"
    GROUP BY month
    ORDER BY month ASC;
  `;

  return result;
};

export const StatsService = {
  getDashboardStatsData,
};
