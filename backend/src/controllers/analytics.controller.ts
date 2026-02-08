import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Goal from "../models/Goal";
import Activity from "../models/Activity";

import redis from "../config/redis";
import mongoose from "mongoose";

export const getAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Check Cache (Graceful fallback)
    try {
      const cached = await redis.get(`analytics:${userId}`);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
    } catch (cacheErr) {
      console.warn("Analytics Cache Fetch Failed:", cacheErr);
    }

    // Fetch all goals
    const goals = await Goal.find({ userId });

    // Fetch all activities
    const activities = await Activity.find({ userId });

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
      const date = new Date(a.createdAt);
      if (date >= lastWeek) {
        const key = date.toISOString().split("T")[0];
        weekData[key] = (weekData[key] || 0) + (a.spentMinutes || 0);
      }
    });

    // Upcoming deadlines (next 5 upcoming goals)
    const upcomingGoals = goals
      .filter((g) => {
        const d = new Date(g.endDate);
        return d >= now;
      })
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, 5);

    // Overall productivity score (simple metric)
    const productivityScore = Math.round(
      (activityCompletionRate * 0.6) +
      (totalMinutes > 300 ? 40 : (totalMinutes / 300) * 40)
    );

    const result = {
      goalsCount: goals.length,
      totalActivities,
      completedActivities,
      totalMinutes,
      activityCompletionRate,
      weeklyProductivity: weekData,
      upcomingGoals,
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
