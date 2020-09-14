import mongoose from "mongoose";
import User from "./userSchema.js";
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  users: Array,
  messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
  name: String,
  image: String,
});

export default mongoose.model("room", roomSchema);
