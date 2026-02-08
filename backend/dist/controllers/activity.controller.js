"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.updateActivity = exports.getActivitiesByGoal = exports.getAllActivities = exports.createActivity = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const Goal_1 = __importDefault(require("../models/Goal"));
/* =========================
   CREATE ACTIVITY
========================= */
const createActivity = async (req, res) => {
    try {
        const { goalId, title, estimatedMinutes } = req.body;
        const goal = await Goal_1.default.findById(goalId);
        if (!goal)
            return res.status(404).json({ message: "Goal not found" });
        if (goal.userId !== req.userId) {
            return res.status(403).json({ message: "Not allowed" });
        }
        const activity = await Activity_1.default.create({
            goalId,
            userId: req.userId,
            title,
            estimatedMinutes,
            spentMinutes: 0,
            completed: false,
        });
        res.status(201).json(activity);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createActivity = createActivity;
/* =========================
   GET ALL ACTIVITIES (🔥 FIX)
========================= */
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity_1.default.find({
            userId: req.userId,
        });
        res.json(activities);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllActivities = getAllActivities;
/* =========================
   GET ACTIVITIES BY GOAL
========================= */
const getActivitiesByGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const goal = await Goal_1.default.findById(goalId);
        if (!goal)
            return res.status(404).json({ message: "Goal not found" });
        if (goal.userId !== req.userId) {
            return res.status(403).json({ message: "Not allowed" });
        }
        const activities = await Activity_1.default.find({
            goalId,
            userId: req.userId,
        });
        res.json(activities);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getActivitiesByGoal = getActivitiesByGoal;
/* =========================
   UPDATE ACTIVITY
========================= */
const updateActivity = async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id);
        if (!activity)
            return res.status(404).json({ message: "Activity not found" });
        if (activity.userId !== req.userId) {
            return res.status(403).json({ message: "Not allowed" });
        }
        const updated = await Activity_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateActivity = updateActivity;
/* =========================
   DELETE ACTIVITY
========================= */
const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id);
        if (!activity)
            return res.status(404).json({ message: "Activity not found" });
        if (activity.userId !== req.userId) {
            return res.status(403).json({ message: "Not allowed" });
        }
        await Activity_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Activity deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteActivity = deleteActivity;
