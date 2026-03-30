import { Router } from "express";
import {
  createController,
  deleteController,
  getAllController,
  updateController,
} from "./extraService.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", checkAuth(UserRole.ADMIN, UserRole.MANAGER), createController);
router.get("/", getAllController);
router.put(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  updateController,
);
router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  deleteController,
);

export const serviceRoutes = router;
