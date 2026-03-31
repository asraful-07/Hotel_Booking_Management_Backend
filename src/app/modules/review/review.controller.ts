import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import {
  createReviewService,
  deleteReviewService,
  getRoomAverageRatingService,
  getRoomReviewsService,
  getsMyRoomReviewsService,
  getsRoomReviewsService,
  updateReviewService,
} from "./review.service";

export const createWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;

    const result = await createReviewService(payload, user);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Create Review successfully",
      data: result,
    });
  },
);

export const getsRoomReviewsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getsRoomReviewsService();
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Fetch Review successfully",
      data: result,
    });
  },
);

export const getsMyRoomReviewsController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await getsMyRoomReviewsService(user);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Fetch Review successfully",
      data: result,
    });
  },
);

export const getRoomReviewsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getRoomReviewsService(req.params.id as string);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Fetch Review successfully",
      data: result,
    });
  },
);

export const getRoomAverageRatingController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getRoomAverageRatingService(req.params.id as string);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Average rating review successfully",
      data: result,
    });
  },
);

export const updateReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;

    const result = await updateReviewService(
      req.params.id as string,
      payload,
      user,
    );
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Update Review successfully",
      data: result,
    });
  },
);

export const deleteReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    await deleteReviewService(req.params.id as string, user);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Delete Review successfully",
    });
  },
);
