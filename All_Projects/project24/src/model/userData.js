import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userData = mongoose.model("userData", userDataSchema);

export default userData;