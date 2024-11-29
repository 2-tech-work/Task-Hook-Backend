import { models, model, Schema } from "mongoose";

<<<<<<< HEAD
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
=======
// Check if the model already exists before defining
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Basic validation for 10-digit phone numbers
>>>>>>> 3b975c2d50f22ea28a0d44643a64f25760fe1d0a
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
