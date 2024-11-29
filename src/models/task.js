import { Schema, model } from "mongoose";

<<<<<<< HEAD
const taskSchema = new Schema(
  {
    taskName: {
      // Renamed from 'title' to 'taskName'
      type: String,
      required: true,
=======
// Define the Task schema
const taskSchema = new mongoose.Schema({
    taskName: {  // Renamed from 'title' to 'taskName'
        type: String,
        required: true
>>>>>>> 3b975c2d50f22ea28a0d44643a64f25760fe1d0a
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
<<<<<<< HEAD
      type: String,
      enum: ["on progress", "dev done", "completed"], // Updated status values
      default: "on progress",
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
=======
        type: String,
        enum: ['In progress', 'dev done', 'complete', 'To Do'],  // Updated status values
        default: 'To DO'
    }
}, { timestamps: true });

// Export the Task model
module.exports = mongoose.model('Task', taskSchema);
>>>>>>> 3b975c2d50f22ea28a0d44643a64f25760fe1d0a
