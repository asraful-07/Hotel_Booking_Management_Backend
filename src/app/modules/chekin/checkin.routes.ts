import { Router } from "express";
import { CheckinController } from "./checkin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.createCheckin,
);
router.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.getsCheckin,
);
router.patch(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  CheckinController.updateCheckinStatus,
);

export const CheckinRoutes = router;
