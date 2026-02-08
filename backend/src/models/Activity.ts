import { Schema, model } from "mongoose";

export interface IActivity {
  goalId: string;
  title: string;
  estimatedMinutes: number;
  spentMinutes: number;
  completed: boolean;
  lastUpdated?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema(
  {
    goalId: { type: String, required: true },
    title: { type: String, required: true },

    estimatedMinutes: {
      type: Number,
      required: true,
    },

    spentMinutes: {
      type: Number,
      default: 0, // ✅ critical
    },

    completed: {
      type: Boolean,
      default: false, // ✅ critical
    },

    lastUpdated: {
      type: String,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default model<IActivity>("Activity", ActivitySchema);
