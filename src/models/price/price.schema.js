import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    petrolPrice: {
      type: Number,
      default: 0,
    },
    dieselPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Price = mongoose.model("Price", priceSchema);

export default Price;
