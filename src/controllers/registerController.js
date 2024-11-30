import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, phoneNumber, gmail, password } = req.body;

  try {
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this Gmail" });
    }
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      phoneNumber,
      gmail,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser._id, gmail: newUser.gmail, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        gmail: newUser.gmail,
        phoneNumber: newUser.phoneNumber,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
