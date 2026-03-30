import { Request, Response } from "express";
import { createPayment, handlePaymentSuccess } from "./payment.service";

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
