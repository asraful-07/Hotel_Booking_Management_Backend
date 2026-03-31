import { Router } from "express";
import {
  getPaymentHistoryController,
  getsPaymentHistoryController,
  PaymentController,
} from "./payment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/create", PaymentController.createPayment);
router.post("/success", PaymentController.paymentSuccess);
router.post("/fail", PaymentController.paymentFail);
router.get("/history", checkAuth(UserRole.ADMIN), getsPaymentHistoryController);
router.get(
  "/history/:id",
  checkAuth(UserRole.ADMIN),
  getPaymentHistoryController,
);

export const PaymentRoutes = router;
