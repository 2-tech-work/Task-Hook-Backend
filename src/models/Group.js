import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
