import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { CheckinService } from "./checkin.service";

const createCheckin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await CheckinService.createCheckin(payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Check-in created successfully",
    data: result,
  });
});

const getsCheckin = catchAsync(async (req: Request, res: Response) => {
  const result = await CheckinService.getsCheckin();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Check-ins fetched successfully",
    data: result,
  });
});

const updateCheckinStatus = catchAsync(async (req: Request, res: Response) => {
  const { checkinId } = req.params;
  const payload = req.body;
  const result = await CheckinService.updateCheckinStatus(
    checkinId as string,
    payload,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: `Status updated to ${result.status}`,
    data: result,
  });
});

export const CheckinController = {
  createCheckin,
  getsCheckin,
  updateCheckinStatus,
};
