import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    from: Schema.Types.ObjectId,
    body: String,
    // timestamp: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", messageSchema);
