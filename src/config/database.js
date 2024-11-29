import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/taskmanagement");
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Connection Status:", error.message);
  }
};
