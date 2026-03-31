import { Router } from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  StatsController.getDashboardStats,
);

export const StatsRoutes = router;
