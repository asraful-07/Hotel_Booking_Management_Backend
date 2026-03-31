import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IRoomTypePayload } from "./roomType.interface";

// Create RoomType
const createRoomType = async (payload: IRoomTypePayload) => {
  const { name } = payload;

  // Check duplicate
  const exist = await prisma.roomType.findUnique({
    where: {
      name,
    },
  });

  if (exist) {
    throw new AppError(status.CONFLICT, "Room type already exists");
  }

  const result = await prisma.roomType.create({
    data: {
      name,
    },
  });

  return result;
};

// Get all RoomTypes
const getsRoomTypes = async () => {
  const result = await prisma.roomType.findMany({
    include: {
      rooms: false,
    },
  });
  return result;
};

// Get single RoomType by id
const getRoomType = async (id: string) => {
  const result = await prisma.roomType.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Room type not found");
  }

  return result;
};

// Update RoomType
const updateRoomType = async (id: string, payload: IRoomTypePayload) => {
  const { name } = payload;

  const exist = await prisma.roomType.findUnique({ where: { id } });

  if (!exist) {
    throw new AppError(status.NOT_FOUND, "Room type not found");
  }

  // Check duplicate name
  const duplicate = await prisma.roomType.findUnique({
    where: {
      name,
    },
  });

  if (duplicate && duplicate.id !== id) {
    throw new AppError(status.CONFLICT, "Room type name already exists");
  }

  const result = await prisma.roomType.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return result;
};

// Delete RoomType
const deleteRoomType = async (id: string) => {
  const exist = await prisma.roomType.findUnique({
    where: {
      id,
    },
  });

  if (!exist) {
    throw new AppError(status.NOT_FOUND, "Room type not found");
  }

  const result = await prisma.roomType.delete({
    where: {
      id,
    },
  });

  return result;
};

export const RoomTypeService = {
  createRoomType,
  getsRoomTypes,
  getRoomType,
  updateRoomType,
  deleteRoomType,
};
