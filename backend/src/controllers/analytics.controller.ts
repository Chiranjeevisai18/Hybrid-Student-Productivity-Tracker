import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Goal from "../models/Goal";
import Activity from "../models/Activity";

import redis from "../config/redis";
import mongoose from "mongoose";

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Check Cache (Strict Timeout to prevent hanging)
    try {
      const cached = await Promise.race([
        redis.get(`analytics:${userId}`),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500))
      ]);
      if (cached) {
        return res.json(JSON.parse(cached as string));
      }
    } catch (cacheErr) {
      console.warn("Analytics Cache Skip (Healthy Fallback):", (cacheErr as Error).message);
    }

    // Fetch all goals
    const goals = await Goal.find({
      userId: new mongoose.Types.ObjectId(userId as string)
    });

    // Fetch all activities
    const activities = await Activity.find({
      userId: new mongoose.Types.ObjectId(userId as string)
    });
    // Debug logging for production visibility
    console.log(`Analytics Debug [${userId}]: Found ${goals.length} goals and ${activities.length} activities.`);

    // Total activity duration
    const totalMinutes = activities.reduce((sum, a) => sum + (a.spentMinutes || 0), 0);

    // Completed vs total activities
    const completedActivities = activities.filter((a) => a.completed).length;
    const totalActivities = activities.length;

    const activityCompletionRate =
      totalActivities === 0 ? 0 : Math.round((completedActivities / totalActivities) * 100);

    // Weekly productivity (past 7 days)
    const weekData: Record<string, number> = {};

    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);

    activities.forEach((a) => {
      try {
        const date = new Date(a.createdAt || new Date());
        if (isNaN(date.getTime())) return;

        if (date >= lastWeek) {
          const key = date.toISOString().split("T")[0];
          weekData[key] = (weekData[key] || 0) + (a.spentMinutes || 0);
        }
      } catch (err) {
        console.warn("Date parsing error in analytics:", err);
      }
    });

    // Ensure weekData has entries for the last 7 days even if empty
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (!weekData[key]) weekData[key] = 0;
    }

    // Upcoming deadlines (next 5 upcoming goals)
    const upcomingGoals = goals
      .filter((g) => {
        try {
          const d = new Date(g.endDate);
          return !isNaN(d.getTime()) && d >= now;
        } catch { return false; }
      })
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, 5);

    // Overall productivity score (simple metric)
    const productivityScore = Math.round(
      (activityCompletionRate * 0.6) +
      (totalMinutes > 300 ? 40 : (totalMinutes / 300) * 40)
    );

    // Map for frontend consistency (id vs _id, deadline vs endDate)
    const formattedUpcomingGoals = upcomingGoals.map((g: any) => ({
      id: g._id,
      title: g.title,
      deadline: g.endDate,
    }));

    const result = {
      goalsCount: goals.length,
      totalActivities,
      completedActivities,
      totalMinutes,
      activityCompletionRate,
      weeklyProductivity: weekData,
      upcomingGoals: formattedUpcomingGoals,
      productivityScore,
    };

    // Cache for 5 minutes (Graceful)
    try {
      await redis.set(`analytics:${userId}`, JSON.stringify(result), "EX", 300);
    } catch (cacheErr) {
      console.warn("Analytics Cache Save Failed:", cacheErr);
    }

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
