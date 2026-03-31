import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { ICreatedRoomPayload, IUpdateRoomPayload } from "./room.interface";

const createRoom = async (payload: ICreatedRoomPayload) => {
  const {
    name,
    description,
    price,
    capacity,
    roomTypeId,
    isAvailable,
    images,
    extraBedPrice,
    maxExtraBed,
  } = payload;

  //check room type exists
  const isRoomTypeExist = await prisma.roomType.findUnique({
    where: {
      id: roomTypeId,
    },
  });

  if (!isRoomTypeExist) {
    throw new AppError(status.NOT_FOUND, "Room type not found");
  }

  //create room with transaction
  const result = await prisma.$transaction(async (tx) => {
    const room = await tx.room.create({
      data: {
        name,
        description,
        price,
        capacity,
        roomTypeId,
        isAvailable: isAvailable ?? true,
        extraBedPrice,
        maxExtraBed: maxExtraBed ?? 0,
      },
    });

    //create images (if exists)
    if (images && images.length > 0) {
      await tx.roomImage.create({
        data: {
          roomId: room.id,
          imageUrl: images,
        },
      });
    }

    return room;
  });

  return result;
};

const getsRoom = async () => {
  const result = await prisma.room.findMany({
    include: {
      roomType: true,
      images: true,
      reservations: true,
      checkins: true,
      reviews: true,
      wishlists: true,
    },
  });
  return result;
};

const getSimilarRooms = async (roomId: string) => {
  const currentRoom = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  if (!currentRoom) {
    throw new AppError(404, "Room not found");
  }

  const similarRooms = await prisma.room.findMany({
    where: {
      id: {
        not: roomId,
      },
      roomTypeId: currentRoom.roomTypeId,
    },
    take: 3,
    include: {
      images: true,
      roomType: true,
    },
  });

  return similarRooms;
};

const getRoom = async (id: string) => {
  const result = await prisma.room.findUnique({
    where: {
      id: id,
    },
    include: {
      roomType: true,
      images: true,
      reservations: true,
      checkins: true,
      reviews: true,
      wishlists: true,
    },
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Room not found");
  }

  return result;
};

const updateRoom = async (roomId: string, payload: IUpdateRoomPayload) => {
  const {
    name,
    description,
    price,
    capacity,
    roomTypeId,
    isAvailable,
    images,
    extraBedPrice,
    maxExtraBed,
  } = payload;

  // check room exists
  const existingRoom = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  if (!existingRoom) {
    throw new AppError(status.NOT_FOUND, "Room not found");
  }

  // if roomTypeId updated, check it exists
  if (roomTypeId) {
    const roomTypeExist = await prisma.roomType.findUnique({
      where: {
        id: roomTypeId,
      },
    });
    if (!roomTypeExist) {
      throw new AppError(status.NOT_FOUND, "Room type not found");
    }
  }

  // transaction for room + images
  const result = await prisma.$transaction(async (tx) => {
    // update room fields
    const updatedRoom = await tx.room.update({
      where: { id: roomId },
      data: {
        name,
        description,
        price,
        capacity,
        roomTypeId,
        isAvailable,
        extraBedPrice,
        maxExtraBed,
      },
    });

    // replace images if provided
    if (images) {
      // delete old images
      await tx.roomImage.deleteMany({
        where: { roomId },
      });

      // create new images
      if (images.length > 0) {
        await tx.roomImage.create({
          data: {
            roomId,
            imageUrl: images,
          },
        });
      }
    }

    return updatedRoom;
  });

  return result;
};

const deleteRoom = async (id: string) => {
  const existsRoom = await prisma.room.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.room.delete({
    where: {
      id: existsRoom?.id,
    },
  });
  return result;
};

export const RoomService = {
  createRoom,
  getsRoom,
  getSimilarRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
