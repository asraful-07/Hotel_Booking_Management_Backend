import { Request, Response } from "express";
import {
  createPayment,
  getPaymentHistoryService,
  getsPaymentHistoryService,
  handlePaymentSuccess,
} from "./payment.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

export const PaymentController = {
  createPayment: async (req: Request, res: Response) => {
    const { reservationId, amount } = req.body;

    try {
      const result = await createPayment({ reservationId, amount });
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json({ status: "fail", message: err.message });
    }
  },

  paymentSuccess: async (req: Request, res: Response) => {
    try {
      const result = await handlePaymentSuccess(req, res);
      return result;
    } catch (err: any) {
      return res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  paymentFail: async (req: Request, res: Response) => {
    return res
      .status(400)
      .json({ status: "fail", message: "Payment failed or canceled" });
  },
};

export const getsPaymentHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const payment = await getsPaymentHistoryService();
    sendResponse(res, {
      httpStatusCode: status.OK,
      message: "Payment history retrieved successfully",
      success: true,
      data: payment,
    });
  },
);

export const getPaymentHistoryController = catchAsync(
  async (req: Request, res: Response) => {
    const payment = await getPaymentHistoryService(req.params.id as string);
    sendResponse(res, {
      httpStatusCode: status.OK,
      message: "Payment history retrieved successfully",
      success: true,
      data: payment,
    });
  },
);
