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
    // this will first find user in db if no user find with email it will create new
    // this will also prevent duplicates document by not creating twice
    // and will also help because we dont have different login and signup button in our frontend
    let user = await User.findOne({ email: req.body.data.email });

    if (!user) {
      user = await User.create(req.body.data);
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

export const findUser = async (req, res) => {
  // this will run when user want to add another user in the room  (in our frontend)
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.data.email },
      { $addToSet: { roomId: req.params.id } } // this will only insert if the user if already not present in the room ...... hence prevent duplicates
    );
    // this will only run if user is found with the given email
    if (user) {
      const room = await Room.findOne({ _id: req.params.id });
      pusher.trigger(req.body.data.email, "room", {
        data: {
          data: room,
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

export const deleteRoom = async (req, res) => {
  // this will remove the room with given id from user roomId array
  try {
    let user = await User.findById(req.params.id);

    // this will filter the room array and push all element which has different values than req.params.id
    const rooms = user.roomId.filter(
      (id) => id.toString() !== req.params.roomId
    );
    // this will update new roomId array in our db
    user = await User.findByIdAndUpdate(
      req.params.id,
      { roomId: rooms },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};
