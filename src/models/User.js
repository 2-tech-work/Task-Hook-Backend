import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs"; // Ensure consistent import

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    gmail: {
      type: String,
      required: [true, "Gmail is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^([\w.%+-]+)@gmail\.com$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid Gmail address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

// Update the password hashing pre-save middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update the password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Direct comparison using bcryptjs
    const isMatch = await bcryptjs.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to get user data without sensitive information
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = model("User", userSchema);

export default User;
