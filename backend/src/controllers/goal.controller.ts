import { Response } from "express";
import Goal from "../models/Goal";
import { AuthRequest } from "../middleware/auth";
import Activity from "../models/Activity";
import redis from "../config/redis";
import mongoose from "mongoose";


/* =========================
   CREATE GOAL
========================= */
export const createGoal = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, type, startDate, endDate } = req.body;

    if (!title || !category || !type || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const goal = await Goal.create({
      userId: req.userId,
      title,
      category,
      type,
      startDate,
      endDate,
      progress: 0, // frontend-safe default
    });

    // Invalidate Analytics Cache
    await redis.del(`analytics:${req.userId}`);

    res.status(201).json(goal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ALL GOALS (USER)
========================= */
export const getGoals = async (req: AuthRequest, res: Response) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.json(goals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE GOAL
========================= */
export const updateGoal = async (req: AuthRequest, res: Response) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Ownership check
    if (goal.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Allowed fields only (important!)
    const allowedUpdates = [
      "title",
      "category",
      "type",
      "startDate",
      "endDate",
      "progress",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        (goal as any)[field] = req.body[field];
      }
    });

    await goal.save();

    // Invalidate Analytics Cache
    await redis.del(`analytics:${req.userId}`);

    res.json(goal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE GOAL
========================= */


export const deleteGoal = async (req: AuthRequest, res: Response) => {
  try {
    const goalId = req.params.id;

    // 1️⃣ Verify goal ownership
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (goal.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 2️⃣ Delete all related activities
    await Activity.deleteMany({ goalId });

    // 3️⃣ Delete goal
    await Goal.findByIdAndDelete(goalId);

    // Invalidate Analytics Cache
    await redis.del(`analytics:${req.userId}`);

    res.json({ message: "Goal and related activities deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

