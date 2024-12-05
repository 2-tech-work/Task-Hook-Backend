import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    taskId: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["on progress", "dev done", "completed"],
      default: "on progress",
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
