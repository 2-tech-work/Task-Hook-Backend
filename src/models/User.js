import { models, model, Schema } from "mongoose";

// Check if model already exists before defining
const User =
  models.User ||
  model(
    "User",
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return /\d{10}/.test(v); // Basic validation for 10-digit phone numbers
            },
            message: (props) => `${props.value} is not a valid phone number!`,
          },
        },
        gmail: {
          type: String,
          required: true,
          unique: true,
          validate: {
            validator: function (v) {
              return /^([\w.%+-]+)@gmail\.com$/i.test(v); // Validation to ensure it's a Gmail address
            },
            message: (props) => `${props.value} is not a valid Gmail address!`,
          },
        },
        password: {
          type: String,
          required: true,
        },
        tasks: [
          {
            type: Schema.Types.ObjectId,
            ref: "Task", // Reference to the Task model
          },
        ],
      },
      { timestamps: true }
    )
  );

export default User;
