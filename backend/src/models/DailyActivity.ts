import mongoose from "mongoose";

const DailyActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    notes: {
      type: String,
      default: "",
    },

    links: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "DailyActivity",
  DailyActivitySchema
);
