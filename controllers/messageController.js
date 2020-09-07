import Message from "../schemas/messageSchema.js";
import Room from "../schemas/roomSchema.js";

import Pusher from "pusher";

var pusher = new Pusher({
  appId: "1067561",
  key: "4bada21a2e4ed2a6f96a",
  secret: "a45a0f1957b89d1fc090",
  cluster: "ap2",
  encrypted: true,
});

export default async (req, res) => {
  try {
    // console.log(req.body.data);
    const message = await Message.create(req.body.data);
    // console.log(message);
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { messages: message } }
    );
    // console.log(req.params.id);
    // console.log(room);
    pusher.trigger(req.params.id, "message", {
      message,
      roomId: req.params.id,
    });

    res.status(200).json({
      status: "success",
      data: message,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};
