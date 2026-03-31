import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { UsersService } from "./users.service";

const createManager = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await UsersService.createManager(payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Manager created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getAllUsers();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Users successfully",
    data: result,
  });
});

const getSingleUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getSingleUsers(req.params.id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Users successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;

  const result = await UsersService.updateUser(
    user,
    req.params.id as string,
    payload,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Updated Users successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;

  const result = await UsersService.updateUserRole(user, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

export const UsersController = {
  createManager,
  getAllUsers,
  getSingleUsers,
  updateUser,
  updateUserRole,
};
