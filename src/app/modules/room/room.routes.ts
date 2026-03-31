import { Router } from "express";
import { RoomController } from "./room.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomController.createRoom,
);
router.get("/", RoomController.getsRoom);
router.get("/similar/:id", RoomController.getSimilarRooms);
router.get("/:id", RoomController.getRoom);
router.put(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomController.updateRoom,
);
router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.MANAGER),
  RoomController.deleteRoom,
);

export const roomRoutes = router;
