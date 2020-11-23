import Message from "../schemas/messageSchema.js";
import Room from "../schemas/roomSchema.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import Pusher from "pusher"; // this is used for realtime response

//setting pushe variable
var pusher = new Pusher({
  appId: process.env.PUSHER_appId,
  key: process.env.PUSHER_key,
  secret: process.env.PUSHER_secret,
  cluster: process.env.PUSHER_cluster,
  encrypted: true,
});

export default async (req, res) => {
  try {
    // creating a new message with info in body
    const message = await Message.create(req.body.data);

    // this will update the room with _id : req.params.id and push id of new message
    await Room.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { messages: message } }
    );

    // this will send the response to user with id  req.params.id and add this message to the room of user without reloading the page if the user has subscribed the pusher
    pusher.trigger(req.params.id, "message", {
      message,
      roomId: req.params.id,
    });
    // send response
    // console.log(message);
    res.status(201).json({
      status: "success",
      data: message,
    });
  } catch (err) {
    // send error
    // console.log(err)
    res.status(500).json({
      status: "error",
      err,
    });
  }
};
