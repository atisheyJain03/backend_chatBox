import express from "express";
import { createRoom, findRoom } from "./controllers/roomController.js";
import { user, findUser } from "./controllers/userController.js";
import message from "./controllers/messageController.js";

const router = express.Router();

router.get("/room/:id", findRoom);
router.post("/room", createRoom);

router.post("/user", user);
router.post("/user/:id", findUser);

router.post("/message/:id", message);

export default router;