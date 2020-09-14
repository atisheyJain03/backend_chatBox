import express from "express";
import {
  createRoom,
  findRoom,
  updateRoom,
} from "./controllers/roomController.js";
import {
  user,
  findUser,
  deleteRoom,
  updateUser,
} from "./controllers/userController.js";
import message from "./controllers/messageController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello From Server");
});
router.get("/room/:id", findRoom);
router.post("/room", createRoom);
router.patch("/room/:id", updateRoom);

router.post("/user", user);
router.post("/user/:id", findUser);
router.patch("/user/:id/:roomId", deleteRoom);
router.patch("/user", updateUser);

router.post("/message/:id", message);

export default router;
