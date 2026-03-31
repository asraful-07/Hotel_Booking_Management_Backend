import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { serviceRoutes } from "../modules/extraService/extraService.routes";
import { roomRoutes } from "../modules/room/room.routes";
import { roomTypeRoutes } from "../modules/roomType/roomType.routes";
import { ReservationRoutes } from "../modules/reservation/reservation.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import { CheckinRoutes } from "../modules/chekin/checkin.routes";
import { WishlistRoutes } from "../modules/wishlist/wishlist.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { StatsRoutes } from "../modules/stats/stats.routes";
import { usersRoutes } from "../modules/users/users.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/extra-service", serviceRoutes);
router.use("/room-type", roomTypeRoutes);
router.use("/room", roomRoutes);
router.use("/reservation", ReservationRoutes);
router.use("/payment", PaymentRoutes);
router.use("/checkin", CheckinRoutes);
router.use("/wishlist", WishlistRoutes);
router.use("/review", ReviewRoutes);
router.use("/stats", StatsRoutes);
router.use("/users", usersRoutes);

export const IndexRoutes = router;
