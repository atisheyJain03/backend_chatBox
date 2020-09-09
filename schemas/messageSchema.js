import mongoose from "mongoose";
const Schema = mongoose.Schema;

// message schema will contains from (it is id of the user) and message body
const messageSchema = new mongoose.Schema(
  {
    from: String,
    body: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", messageSchema);
