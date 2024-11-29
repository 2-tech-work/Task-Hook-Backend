import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    taskName: {
      // Renamed from 'title' to 'taskName'
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    groupId: {
      // Foreign key to Group model
      type: Schema.Types.ObjectId,
      ref: "Group", // Assuming you have a Group model
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Predefined priority levels
      default: "medium",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["on progress", "dev done", "completed"], // Updated status values
      default: "on progress",
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
