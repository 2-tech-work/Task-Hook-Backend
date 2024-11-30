import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginAuth = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await User.findOne({ gmail: gmail });
    console.log("Found user:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Stored hashed password:", user.password);
    console.log("Password being compared:", password);

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, gmail: user.gmail },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

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
    res.status(400).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
