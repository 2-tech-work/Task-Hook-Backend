import mongoose from "mongoose";
import bcryptjs from "bcryptjs"; // Ensure consistent import

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
