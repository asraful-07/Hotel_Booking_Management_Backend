import { Router } from "express";
import { ReservationController } from "./reservation.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  checkAuth(UserRole.CUSTOMER),
  ReservationController.CreateReservation,
);
router.get(
  "/",
  checkAuth(UserRole.MANAGER, UserRole.CUSTOMER),
  ReservationController.gestMyReservation,
);
router.get(
  "/:id",
  checkAuth(UserRole.MANAGER, UserRole.CUSTOMER),
  ReservationController.getReservationById,
);
router.patch(
  "/:id",
  checkAuth(UserRole.MANAGER),
  ReservationController.updateReservationStatus,
);
router.patch(
  "/cancel/:id",
  checkAuth(UserRole.CUSTOMER),
  ReservationController.cancelMyReservation,
);

export const ReservationRoutes = router;
