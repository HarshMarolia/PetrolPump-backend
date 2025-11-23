import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    pan_number: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    petrol_pumps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
