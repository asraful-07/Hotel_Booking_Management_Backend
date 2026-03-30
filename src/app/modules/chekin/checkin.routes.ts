import { Router } from "express";
import { CheckinController } from "./checkin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

// Admin/Manager creates a check-in for a confirmed reservation
router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.createCheckin,
);

// Admin/Manager fetches all check-ins
router.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.getsCheckin,
);

// NEW: Admin/Manager updates check-in status (PENDING → CHECKED_IN → CHECKED_OUT)
router.patch(
  "/:checkinId/status",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.updateCheckinStatus,
);

export const CheckinRoutes = router;
