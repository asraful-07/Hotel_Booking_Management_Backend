import status from "http-status";
import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import {
  ICreateServicePayload,
  IUpdateServicePayload,
} from "./extraService.interface";

//Create Service
export const createService = async (payload: ICreateServicePayload) => {
  const { name, price, type, isActive } = payload;

  // create service
  const result = await prisma.service.create({
    data: {
      name,
      price: new Prisma.Decimal(price),
      type,
      isActive: isActive ?? true,
    },
  });

  return result;
};

// Get All Services
export const getAllServices = async () => {
  const result = await prisma.service.findMany({
    where: {
      isActive: true,
    },
  });

  return result;
};

// Update Service
export const updateService = async (
  id: string,
  payload: IUpdateServicePayload,
) => {
  // check exist
  const isExist = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Service not found");
  }

  const { name, price, type, isActive } = payload;

  const result = await prisma.service.update({
    where: {
      id,
    },
    data: {
      name,
      type,
      isActive,
      ...(price !== undefined && {
        price: new Prisma.Decimal(price),
      }),
    },
  });

  return result;
};

// Delete Service
export const deleteService = async (id: string) => {
  // check exist
  const isExist = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "Service not found");
  }

  // Hard delete
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};
