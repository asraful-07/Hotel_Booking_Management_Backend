import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { IRequestUser } from "../../interface/requestUser.interface";
import { prisma } from "../../lib/prisma";
import {
  ICreateManagerPayload,
  IUpdateUserPayload,
  IUpdateUserRolePayload,
} from "./users.interface";
import { auth } from "../../lib/auth";
import { UserRole } from "../../../generated/prisma/enums";

const createManager = async (payload: ICreateManagerPayload) => {
  const { name, email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new AppError(status.BAD_REQUEST, "User already exists");
  }

  let userData;

  try {
    userData = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role: UserRole.MANAGER,
      },
    });
  } catch (error: any) {
    throw new AppError(status.BAD_REQUEST, "Auth user creation failed");
  }

  try {
    const user = await prisma.user.create({
      data: {
        id: userData.user.id,
        name,
        email,
        role: UserRole.MANAGER,
      },
    });

    return user;
  } catch (error: any) {
    if (error.code === "P2002") {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      return existingUser;
    }

    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to save user in database",
    );
  }
};

const getAllUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

const getSingleUsers = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return data;
};

const updateUser = async (
  user: IRequestUser,
  id: string,
  payload: IUpdateUserPayload,
) => {
  const { name, phone, image } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existingUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const data = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      phone,
      image,
    },
  });

  return data;
};

const updateUserRole = async (
  user: IRequestUser,
  payload: IUpdateUserRolePayload,
) => {
  const { userId, role } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (existingUser.id === user.userId) {
    throw new AppError(status.BAD_REQUEST, "You cannot change your own role");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });

  return updatedUser;
};

export const UsersService = {
  createManager,
  getAllUsers,
  getSingleUsers,
  updateUser,
  updateUserRole,
};
