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

router.post("/", checkAuth(UserRole.CUSTOMER), createWishlistController);
router.get("/", checkAuth(UserRole.CUSTOMER), getMyWishlistController);
router.delete("/:id", checkAuth(UserRole.CUSTOMER), deleteWishlistController);
router.delete("/clear", checkAuth(UserRole.CUSTOMER), clearWishlistController);

export const WishlistRoutes = router;
