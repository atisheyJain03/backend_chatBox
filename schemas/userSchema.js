import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  image: String,
  roomId: {
    type: Array,
  },
  email: String,
});

export default mongoose.model("user", userSchema);
