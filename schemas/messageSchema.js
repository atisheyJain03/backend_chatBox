import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
