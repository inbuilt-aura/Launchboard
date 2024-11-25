import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    sparse: true,
  },
  ethAddress: {
    type: String,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  bannerImage: { type: String },
  banner: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
