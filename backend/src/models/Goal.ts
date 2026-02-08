import mongoose from "mongoose";

export interface IGoal {
  title: string;
  category: string;
  type: string;
  progress: number;
  startDate: string;
  endDate: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    progress: { type: Number, default: 0 },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true, collection: "goals" }
);

const Goal = mongoose.model<IGoal>("Goal", GoalSchema);
export default Goal;
