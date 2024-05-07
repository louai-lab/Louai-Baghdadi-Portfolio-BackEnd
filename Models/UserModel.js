import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
    elevatorPitch: {
      type: String,
      required: true,
    },
    profile: { type: String, required: true },
    logo: { type: String, required: true },
    cv: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,

      required: true,
    },
    linkedinLink: {
      type: String,

      required: true,
    },
    instagramLink: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
