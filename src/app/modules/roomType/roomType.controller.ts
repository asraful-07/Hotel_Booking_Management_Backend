import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { RoomTypeService } from "./roomType.service";

const createRoomType = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await RoomTypeService.createRoomType(payload);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Crate RoomType successfully",
    data: result,
  });
});

const getsRoomTypes = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomTypeService.getsRoomTypes();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch RoomType successfully",
    data: result,
  });
});

const getRoomType = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomTypeService.getRoomType(req.params.id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch RoomType successfully",
    data: result,
  });
});

const updateRoomType = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await RoomTypeService.updateRoomType(
    req.params.id as string,
    payload,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Update RoomType successfully",
    data: result,
  });
});

const deleteRoomType = catchAsync(async (req: Request, res: Response) => {
  await RoomTypeService.deleteRoomType(req.params.id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Delete RoomType successfully",
  });
});

export const RoomTypeController = {
  createRoomType,
  getsRoomTypes,
  getRoomType,
  updateRoomType,
  deleteRoomType,
};
