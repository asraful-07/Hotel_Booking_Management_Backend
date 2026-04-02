import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateWishlistPayload } from "./wishlist.interface";
import { IRequestUser } from "../../interface/requestUser.interface";

// Create Wishlist
export const createWishlistService = async (
  payload: ICreateWishlistPayload,
  user: IRequestUser,
) => {
  const { roomId } = payload;

  // find logged-in user
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // already exists check
  const isExist = await prisma.wishlist.findUnique({
    where: {
      userId_roomId: {
        userId: existsUser.id,
        roomId,
      },
    },
  });

  if (isExist) {
    throw new AppError(status.BAD_REQUEST, "Already added to wishlist");
  }

  // create
  const result = await prisma.wishlist.create({
    data: {
      userId: existsUser.id,
      roomId,
    },
  });

  return result;
};

// Get My Wishlist
export const getMyWishlistService = async (user: IRequestUser) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const result = await prisma.wishlist.findMany({
    where: {
      userId: existsUser.id,
    },
    include: {
      room: {
        include: {
          images: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

// Clear Wishlist
export const clearWishlistService = async (user: IRequestUser) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const result = await prisma.wishlist.deleteMany({
    where: {
      userId: existsUser.id,
    },
  });

  return result;
};

// Delete Wishlist
export const deleteWishlistService = async (user: IRequestUser, id: string) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existsUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const isExist = await prisma.wishlist.findUnique({
    where: {
      id: id,
    },
  });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Wishlist item not found");
  }

  const result = await prisma.wishlist.delete({
    where: {
      id: id,
    },
  });

  return result;
};
