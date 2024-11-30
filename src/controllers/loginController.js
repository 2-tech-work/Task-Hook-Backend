import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await User.findOne({ gmail });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, gmail: user.gmail, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send successful response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        gmail: user.gmail,
        phoneNumber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
