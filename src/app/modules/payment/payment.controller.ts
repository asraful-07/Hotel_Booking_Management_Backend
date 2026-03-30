import { Request, Response } from "express";
import { createPayment, handlePaymentSuccess } from "./payment.service";
import { envVars } from "../../config/env";

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
      const { tran_id } = req.body;

      console.log("res", tran_id);

      console.log("SSL SUCCESS BODY:", req.body);

      const payment = await handlePaymentSuccess(tran_id);

      // ✅ redirect frontend
      return res.redirect(
        `${envVars.FRONTEND_URL}/payment/payment-success/${tran_id}`,
      );
    } catch (err: any) {
      console.error(err);
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
