import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { RoomService } from "./room.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { paginationSorting } from "../../utils/paginationSorting";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await RoomService.createRoom(payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Create Room successfully",
    data: result,
  });
});

const getsRoom = catchAsync(async (req: Request, res: Response) => {
  const { search } = req.query;

  const searchString = typeof search === "string" ? search : undefined;

  //* pagination and sorting desc
  const { page, limit, skip, sortBy, sortOrder } = paginationSorting(req.query);

  const result = await RoomService.getsRoom({
    search: searchString,
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Room successfully",
    data: result.data,
    meta: result.pagination,
  });
});

const getSimilarRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getSimilarRooms(req.params.id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Room successfully",
    data: result,
  });
});

const getRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getRoom(req.params.id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Room successfully",
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await RoomService.updateRoom(req.params.id as string, payload);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Updated Room successfully",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  await RoomService.deleteRoom(req.params.id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Delete Room successfully",
  });
});

export const RoomController = {
  createRoom,
  getSimilarRooms,
  getsRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};
