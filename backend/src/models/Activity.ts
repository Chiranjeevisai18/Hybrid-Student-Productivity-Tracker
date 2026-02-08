import mongoose from "mongoose";

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

const ActivitySchema = new mongoose.Schema(
  {
    goalId: { type: String, required: true },
    title: { type: String, required: true },
    estimatedMinutes: { type: Number, required: true },
    spentMinutes: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    lastUpdated: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true, collection: "activities" }
);

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
export default Activity;
