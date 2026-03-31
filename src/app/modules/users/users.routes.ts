import { Router } from "express";
import { UsersController } from "./users.controller";
import { UserRole } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.post(
  "/create-manager",
  checkAuth(UserRole.ADMIN),
  UsersController.createManager,
);
router.get("/", checkAuth(UserRole.ADMIN), UsersController.getAllUsers);
router.get("/:id", UsersController.getSingleUsers);
router.patch(
  "/me/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  UsersController.updateUser,
);
router.patch(
  "/role/:id",
  checkAuth(UserRole.ADMIN),
  UsersController.updateUserRole,
);

export const usersRoutes = router;
