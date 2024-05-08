import mongoose from "mongoose";

const newSchema = new mongoose.Schema(
  {
    newsWriter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sourceLink: {
      type: String,
      required: true,
    },
    newsFor: {
      type: String,
      enum: ["city", "state", "country"],
      default: "local",
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newSchema);

export default News;
