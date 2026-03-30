import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from "./extraService.service";

export const createController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await createService(payload);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Create extra service successfully",
      data: result,
    });
  },
);

export const getAllController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllServices();
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Fetch extra service successfully",
      data: result,
    });
  },
);

export const updateController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await updateService(req.params.id as string, payload);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Updated extra service successfully",
      data: result,
    });
  },
);

export const deleteController = catchAsync(
  async (req: Request, res: Response) => {
    await deleteService(req.params.id as string);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Deleted extra service successfully",
    });
  },
);
