import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;

  // Input validation
  if (!gmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Debug log
    console.log("Login attempt for:", gmail);

    const user = await User.findOne({ gmail: gmail.trim().toLowerCase() });

    // Debug log
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        debug: "User not found",
      });
    }

    // Debug password comparison
    console.log("Comparing passwords...");
    const isPasswordValid = await bcrypt.compare(
      String(password),
      user.password
    );
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        debug: "Password mismatch",
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

    // Debug log
    console.log("Token generated successfully");

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
    console.error("Detailed login error:", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
