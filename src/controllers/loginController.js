import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Gmail and password are required",
    });
  }

  try {
    const user = await User.findOne({ gmail: gmail.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Direct password comparison
    const decryptedPassword = await bcrypt.compare(password, user.password);
    if (!decryptedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        gmail: user.gmail,
        role: user.role || "user",
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        gmail: user.gmail,
        phoneNumber: user.phoneNumber,
        role: user.role || "user",
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
