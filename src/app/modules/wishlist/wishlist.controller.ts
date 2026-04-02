import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import {
  clearWishlistService,
  createWishlistService,
  deleteWishlistService,
  getMyWishlistService,
} from "./wishlist.service";

export const createWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const result = await createWishlistService(payload, user);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Create wishlist successfully",
      data: result,
    });
  },
);

export const getMyWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await getMyWishlistService(user);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Fetch wishlist successfully",
      data: result,
    });
  },
);

export const clearWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await clearWishlistService(user);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Clear wishlist successfully",
      data: result,
    });
  },
);

export const deleteWishlistController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await deleteWishlistService(user, req.params.id as string);
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Delete wishlist successfully",
      data: result,
    });
  },
);
