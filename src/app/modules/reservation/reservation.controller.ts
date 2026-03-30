import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { ReservationService } from "./reservation.service";

const CreateReservation = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;

  const result = await ReservationService.CreateReservation(user, payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Create Reservation successfully",
    data: result,
  });
});

const gestMyReservation = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await ReservationService.gestMyReservation(user);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Reservation successfully",
    data: result,
  });
});

const getReservationById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReservationService.getReservationById(
    req.params.id as string,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Fetch Reservation successfully",
    data: result,
  });
});

const updateReservationStatus = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await ReservationService.updateReservationStatus(
      payload,
      req.params.id as string,
    );
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Updated Reservation successfully",
      data: result,
    });
  },
);

const cancelMyReservation = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await ReservationService.cancelMyReservation(
    user,
    req.params.id as string,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Cancelled Reservation successfully",
    data: result,
  });
});

export const ReservationController = {
  CreateReservation,
  gestMyReservation,
  getReservationById,
  updateReservationStatus,
  cancelMyReservation,
};
