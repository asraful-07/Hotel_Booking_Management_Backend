import { Router } from "express";
import {
  CreateCustomerController,
  GetMeController,
  GetNewTokenController,
  LoginCustomerController,
  logoutUserController,
} from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", CreateCustomerController);
router.post("/login", LoginCustomerController);
router.get(
  "/me",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  GetMeController,
);
router.post("/refresh-token", GetNewTokenController);
router.post(
  "/logout",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  logoutUserController,
);

export const authRoutes = router;
