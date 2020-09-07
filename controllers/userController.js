import User from "../schemas/userSchema.js";
import Room from "../schemas/roomSchema.js";

import Pusher from "pusher";

var pusher = new Pusher({
  appId: "1067561",
  key: "4bada21a2e4ed2a6f96a",
  secret: "a45a0f1957b89d1fc090",
  cluster: "ap2",
  encrypted: true,
});

export const user = async (req, res) => {
  try {
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.data.email });

    if (!user) {
      user = await User.create(req.body.data);
    }
    // console.log(user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

export const findUser = async (req, res) => {
  try {
    // console.log(req.body.data);
    const user = await User.findOneAndUpdate(
      { email: req.body.data.email },
      { $addToSet: { roomId: req.params.id } }
    );

    const room = await Room.findOne({ _id: req.params.id });
    // console.log(room);
    pusher.trigger(req.body.data.email, "room", {
      data: {
        data: room,
      },
    });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      status: "error",
      err,
    });
  }
};
