"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const Goal_1 = __importDefault(require("../models/Goal"));
const Activity_1 = __importDefault(require("../models/Activity"));
const getAnalytics = async (req, res) => {
    try {
        const userId = req.userId;
        // Fetch all goals
        const goals = await Goal_1.default.find({ userId });
        // Fetch all activities
        const activities = await Activity_1.default.find({ userId });
        // Total activity duration
        const totalMinutes = activities.reduce((sum, a) => sum + (a.duration || 0), 0);
        // Completed vs total activities
        const completedActivities = activities.filter((a) => a.completed).length;
        const totalActivities = activities.length;
        const activityCompletionRate = totalActivities === 0 ? 0 : Math.round((completedActivities / totalActivities) * 100);
        // Weekly productivity (past 7 days)
        const weekData = {};
        const now = new Date();
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        activities.forEach((a) => {
            const date = new Date(a.createdAt);
            if (date >= lastWeek) {
                const key = date.toISOString().split("T")[0];
                weekData[key] = (weekData[key] || 0) + (a.duration || 0);
            }
        });
        // Upcoming deadlines (next 7 days)
        const upcomingGoals = goals
            .filter((g) => {
            const d = new Date(g.deadline);
            return d >= now && d <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        })
            .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        // Overall productivity score (simple metric)
        const productivityScore = Math.round((activityCompletionRate * 0.6) +
            (totalMinutes > 300 ? 40 : (totalMinutes / 300) * 40));
        res.json({
            goalsCount: goals.length,
            totalActivities,
            completedActivities,
            totalMinutes,
            activityCompletionRate,
            weeklyProductivity: weekData,
            upcomingGoals,
            productivityScore,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAnalytics = getAnalytics;
