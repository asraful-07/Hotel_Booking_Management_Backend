import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../../interface/requestUser.interface";
import { ICreateReviewPayload, IUpdateReviewPayload } from "./review.interface";

export const createReviewService = async (
  payload: ICreateReviewPayload,
  user: IRequestUser,
) => {
  const { roomId, rating, comment } = payload;

  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const isExist = await prisma.review.findUnique({
    where: {
      userId_roomId: {
        userId: existsUser.id,
        roomId,
      },
    },
  });

  if (isExist) {
    throw new AppError(status.BAD_REQUEST, "You already reviewed this room");
  }

  if (rating < 1 || rating > 5) {
    throw new AppError(status.BAD_REQUEST, "Rating must be between 1-5");
  }

  const result = await prisma.review.create({
    data: {
      userId: existsUser.id,
      roomId,
      rating,
      comment,
    },
  });

  return result;
};

export const getsRoomReviewsService = async () => {
  const result = await prisma.review.findMany({
    include: {
      room: {
        include: {
          images: true,
        },
      },
    },
  });

  return result;
};

export const getsMyRoomReviewsService = async (user: IRequestUser) => {
  const result = await prisma.review.findMany({
    where: {
      userId: user.email,
    },
    include: {
      room: {
        include: {
          images: true,
        },
      },
    },
  });

  return result;
};

export const getRoomReviewsService = async (roomId: string) => {
  const result = await prisma.review.findMany({
    where: {
      roomId,
    },
    include: {
      room: {
        include: {
          images: true,
        },
      },
    },
  });
  return result;
};

export const getRoomAverageRatingService = async (roomId: string) => {
  const result = await prisma.review.aggregate({
    where: {
      roomId,
    },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count.rating,
  };
};

export const updateReviewService = async (
  reviewId: string,
  payload: IUpdateReviewPayload,
  user: IRequestUser,
) => {
  const { rating, comment } = payload;

  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new AppError(status.NOT_FOUND, "Review not found");
  }

  // ownership check
  if (review.userId !== existsUser.id) {
    throw new AppError(status.FORBIDDEN, "You cannot update this review");
  }

  // rating validation
  if (rating && (rating < 1 || rating > 5)) {
    throw new AppError(status.BAD_REQUEST, "Rating must be between 1-5");
  }

  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      ...(rating && { rating }),
      ...(comment && { comment }),
    },
  });

  return result;
};

export const deleteReviewService = async (
  reviewId: string,
  user: IRequestUser,
) => {
  const existsUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new AppError(status.NOT_FOUND, "Review not found");
  }

  // allow owner or admin
  if (review.userId !== existsUser.id && user.role !== "ADMIN") {
    throw new AppError(status.FORBIDDEN, "You cannot delete this review");
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return null;
};
