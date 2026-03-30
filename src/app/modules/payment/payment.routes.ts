import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/create", PaymentController.createPayment);
router.post("/success", PaymentController.paymentSuccess);
router.post("/fail", PaymentController.paymentFail);

export const PaymentRoutes = router;
