import Room from "../schemas/roomSchema.js";
import User from "../schemas/userSchema.js";

const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body.data);
    // console.log(req.body.data);

    const user = await User.findOneAndUpdate(
      { email: req.body.data.user },
      { $addToSet: { roomId: room._id } }
    );
    // console.log(user);
    res.status(200).json({
      status: "success",
      data: room,
    });
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

const findRoom = async (req, res) => {
  try {
    // console.log(req.params.id);
    const room = await Room.findOne({ _id: req.params.id }).populate({
      path: "messages",
      options: {
        sort: { createdAt: 1 },
      },
    });
    // console.log(room);
    res.status(200).json({
      status: "success",
      data: room,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

export { createRoom, findRoom };
