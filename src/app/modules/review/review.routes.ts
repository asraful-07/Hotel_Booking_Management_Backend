import { Router } from "express";
import {
  createWishlistController,
  getRoomAverageRatingController,
  getRoomReviewsController,
  getsMyRoomReviewsController,
  getsRoomReviewsController,
} from "./review.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", checkAuth(UserRole.CUSTOMER), createWishlistController);
router.get("/", getsRoomReviewsController);
router.get(
  "/my-reviews",
  checkAuth(UserRole.CUSTOMER),
  getsMyRoomReviewsController,
);
router.get("/room/:id", getRoomReviewsController);
router.get("/:id", getRoomAverageRatingController);
router.patch(
  "/:id",
  checkAuth(UserRole.CUSTOMER),
  getRoomAverageRatingController,
);
router.delete(
  "/:id",
  checkAuth(UserRole.CUSTOMER),
  getRoomAverageRatingController,
);

export const ReviewRoutes = router;
