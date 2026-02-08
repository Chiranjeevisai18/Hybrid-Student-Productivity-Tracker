import { Response } from "express";
import Activity from "../models/Activity";
import Goal from "../models/Goal";
import { AuthRequest } from "../middleware/auth";
import redis from "../config/redis";
import mongoose from "mongoose";

/* =========================
   CREATE ACTIVITY
========================= */
export const createActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { goalId, title, estimatedMinutes } = req.body;

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (goal.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const activity = await Activity.create({
      goalId,
      userId: req.userId,
      title,
      estimatedMinutes,
      spentMinutes: 0,
      completed: false,
    });

    // Invalidate Analytics Cache (Non-blocking)
    if (req.userId) redis.del(`analytics:${req.userId}`).catch(console.warn);

    res.status(201).json(activity);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ALL ACTIVITIES (🔥 FIX)
========================= */
export const getAllActivities = async (req: AuthRequest, res: Response) => {
  try {
    const activities = await Activity.find({
      userId: req.userId,
    });

    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ACTIVITIES BY GOAL
========================= */
export const getActivitiesByGoal = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (goal.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const activities = await Activity.find({
      goalId,
      userId: req.userId,
    });

    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE ACTIVITY
========================= */
export const updateActivity = async (req: AuthRequest, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    if (activity.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Award XP if newly completed
    if (!activity.completed && req.body.completed) {
      const User = require("../models/User").default;
      const user = await User.findById(req.userId);

      const earnedXP = 15; // 15 XP for Goal Activities (harder than daily)
      user.xp = (user.xp || 0) + earnedXP;

      await user.save();
      console.log(`Awarded ${earnedXP} XP to user ${user.name}`);

      // Invalidate Analytics Cache (Non-blocking)
      if (req.userId) redis.del(`analytics:${req.userId}`).catch(console.warn);
    }

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE ACTIVITY
========================= */
export const deleteActivity = async (req: AuthRequest, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    if (activity.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Activity.findByIdAndDelete(req.params.id);

    // Invalidate Analytics Cache (Non-blocking)
    if (req.userId) redis.del(`analytics:${req.userId}`).catch(console.warn);

    res.json({ message: "Activity deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
