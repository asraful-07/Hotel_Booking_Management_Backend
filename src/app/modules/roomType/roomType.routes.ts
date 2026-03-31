import { Router } from "express";
import { RoomTypeController } from "./roomType.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomTypeController.createRoomType,
);
router.get("/", RoomTypeController.getsRoomTypes);
router.get("/:id", RoomTypeController.getRoomType);
router.patch(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomTypeController.updateRoomType,
);
router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomTypeController.deleteRoomType,
);

export const roomTypeRoutes = router;
