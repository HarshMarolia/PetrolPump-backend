import mongoose from "mongoose";
// Pump owner
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pumpOwner: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "superUser", "user"],
      default: "user",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    subscription_expiry: {
      type: Date,
      default: Date.now,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
