import { Schema, model } from "mongoose";

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

const GoalSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },

    progress: { type: Number, default: 0 }, // ✅ frontend-safe

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    userId: { type: String }, // later
  },
  { timestamps: true }
);

export default model<IGoal>("Goal", GoalSchema);
