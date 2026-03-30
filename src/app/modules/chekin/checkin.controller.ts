import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { CheckinService } from "./checkin.service";

const createCheckin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await CheckinService.createCheckin(payload);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Create checkin successfully",
    data: result,
  });
});

const getsCheckin = catchAsync(async (req: Request, res: Response) => {
  const result = await CheckinService.getsCheckin();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch checkin successfully",
    data: result,
  });
});

const updateCheckinStatus = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await CheckinService.updateCheckinStatus(
    payload,
    req.params.id as string,
  );
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Update checkin status successfully",
    data: result,
  });
});

export const CheckinController = {
  createCheckin,
  getsCheckin,
  updateCheckinStatus,
};
