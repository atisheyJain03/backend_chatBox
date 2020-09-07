import mongoose from "mongoose";
import User from "./userSchema.js";
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  users: Array,
  messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
  name: String,
});

roomSchema.pre("save", async function (next) {
  let temp = this.users.map(async (id) => {
    const user = await User.findOne({ id: id });
    return user;
  });
  this.users = await Promise.all(temp);
  next();
});

export default mongoose.model("room", roomSchema);
