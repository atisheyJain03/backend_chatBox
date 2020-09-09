import express from "express";
import { createRoom, findRoom } from "./controllers/roomController.js";
import { user, findUser, deleteRoom } from "./controllers/userController.js";
import message from "./controllers/messageController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello From Server");
});
router.get("/room/:id", findRoom);
router.post("/room", createRoom);

router.post("/user", user);
router.post("/user/:id", findUser);
router.patch("/user/:id/:roomId", deleteRoom);

router.post("/message/:id", message);

export default router;
