import Room from "../schemas/roomSchema.js";
import User from "../schemas/userSchema.js";

const createRoom = async (req, res, next) => {
  // this will run when user create new room
  try {
    // this will create room
    const room = await Room.create(req.body.data);

    const user = await User.findOneAndUpdate(
      { email: req.body.data.user },
      { $push: { roomId: room._id } } // push the room._id in the array  roomId
    );
    //send response
    res.status(201).json({
      status: "success",
      data: room,
    });
  } catch (err) {
    // send error
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

const findRoom = async (req, res) => {
  try {
    let room;

    const header = req.headers.populate * 1; // this will conver string to number

    if (header === 1) {
      // THIS WILL RUN WHEN USER REQUEST IN Chat.js file of our frontend of project
      room = await Room.findOne({ _id: req.params.id }).populate({
        path: "messages",
        options: {
          sort: { createdAt: 1 }, // this will sort the populated document in increasing order
        },
      });
    } else {
      // if user doesn't want populated room
      // THIS WILL RUN WHEN USER REQUEST IN Sidebar.js file of our frontend of project
      room = await Room.findOne({ _id: req.params.id });
    }

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
