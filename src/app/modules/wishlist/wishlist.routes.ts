import { Router } from "express";
import {
  clearWishlistController,
  createWishlistController,
  deleteWishlistController,
  getMyWishlistController,
} from "./wishlist.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  createWishlistController,
);
router.get(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  getMyWishlistController,
);
router.delete(
  "/clear",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  clearWishlistController,
);

router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER),
  deleteWishlistController,
);

export const WishlistRoutes = router;
