import status from "http-status";
import { PaymentMethod, PaymentStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import axios from "axios";
import { envVars } from "../../config/env";
import qs from "qs";

export const createPayment = async (payload: any) => {
  const { reservationId, amount } = payload;

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { user: true },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  // use reservationId as tran_id (simpler & safer)
  const tran_id = reservationId;

  const post_data = {
    store_id: envVars.SSL_STORE_ID,
    store_passwd: envVars.SSL_STORE_PASS,
    total_amount: amount,
    currency: "BDT",
    tran_id,
    success_url: `${envVars.BACKEND_URL}/api/v1/payment/success`,
    fail_url: `${envVars.BACKEND_URL}/api/v1/payment/fail`,
    cancel_url: `${envVars.BACKEND_URL}/api/v1/payment/cancel`,
    cus_name: reservation.user?.name || "Guest",
    cus_email: reservation.user.email,
    cus_add1: "Dhaka",
    cus_phone: "01700000000",
    product_name: `Reservation-${reservationId}`,
  };

  const sslUrl = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

  const response = await axios.post(sslUrl, qs.stringify(post_data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // console.log("SSL RESPONSE:", response.data);

  return {
    redirectUrl: response.data.GatewayPageURL,
  };
};

export const handlePaymentSuccess = async (req: any, res: any) => {
  try {
    const { tran_id } = req.body;

    console.log("SSL SUCCESS BODY:", req.body);

    if (!tran_id) {
      throw new Error("Transaction ID missing");
    }

    const reservationId = tran_id;

    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new AppError(status.NOT_FOUND, "Reservation not found");
    }

    // payment update/create
    await prisma.payment.upsert({
      where: {
        reservationId,
      },
      update: {
        amount: reservation.totalPrice,
        status: PaymentStatus.SUCCESS,
        transactionId: tran_id,
        paymentMethod: PaymentMethod.SSLCOMMERZ,
      },
      create: {
        reservationId,
        amount: reservation.totalPrice,
        currency: "BDT",
        status: PaymentStatus.SUCCESS,
        transactionId: tran_id,
        paymentMethod: PaymentMethod.SSLCOMMERZ,
      },
    });

    // reservation confirm
    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: "CONFIRMED",
      },
    });

    // FINAL REDIRECT (MOST IMPORTANT)
    return res.redirect(
      `${envVars.FRONTEND_URL}/payment/payment-success/${reservationId}`,
    );
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getsPaymentHistoryService = async () => {
  const payments = await prisma.payment.findMany({
    include: {
      reservation: {
        include: {
          room: true,
          user: true,
        },
      },
    },
  });

  return payments;
};

export const getPaymentHistoryService = async (id: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      reservation: {
        include: {
          room: true,
          user: true,
        },
      },
    },
  });

  return payment;
};
