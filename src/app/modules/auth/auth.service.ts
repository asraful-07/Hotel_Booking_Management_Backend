import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { getAccessToken, getRefreshToken } from "../../utils/token";
import {
  ILoginCustomerPayload,
  IRegisterCustomerPayload,
} from "./auth.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { IRequestUser } from "../../interface/requestUser.interface";

export const CreateCustomerService = async (
  payload: IRegisterCustomerPayload,
) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    throw new Error("Failed to create customer");
  }

  const user = data.user;

  const accessToken = getAccessToken({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
  });

  const refreshToken = getRefreshToken({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
  });

  return {
    user,
    accessToken,
    refreshToken,
    token: data.token,
  };
};

export const LoginCustomerService = async (payload: ILoginCustomerPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  const accessToken = getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    emailVerified: data.user.emailVerified,
  });

  const refreshToken = getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    emailVerified: data.user.emailVerified,
  });

  return { ...data, accessToken, refreshToken };
};

export const GetMeService = async (user: IRequestUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!isUserExists) {
    throw new AppError(status.UNAUTHORIZED, "Unauthorized user");
  }

  return isUserExists;
};

export const GetNewTokenService = async (
  refreshToken: string,
  sessionToken: string,
) => {
  const isSessionTokenExists = prisma.session.findUnique({
    where: {
      id: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!isSessionTokenExists) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET,
  );

  if (!verifiedRefreshToken.success) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const data = verifiedRefreshToken as JwtPayload;

  const newAccessToken = getAccessToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    emailVerified: data.emailVerified,
  });

  const newRefreshToken = getRefreshToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    emailVerified: data.emailVerified,
  });

  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
      updatedAt: new Date(),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token,
  };
};

export const logoutUserService = async (sessionToken: string) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  return result;
};
