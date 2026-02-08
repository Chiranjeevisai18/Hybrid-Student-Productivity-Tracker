"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.getGoals = exports.createGoal = void 0;
const Goal_1 = __importDefault(require("../models/Goal"));
const Activity_1 = __importDefault(require("../models/Activity"));
/* =========================
   CREATE GOAL
========================= */
const createGoal = async (req, res) => {
    try {
        const { title, category, type, startDate, endDate } = req.body;
        if (!title || !category || !type || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const goal = await Goal_1.default.create({
            userId: req.userId,
            title,
            category,
            type,
            startDate,
            endDate,
            progress: 0, // frontend-safe default
        });
        res.status(201).json(goal);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createGoal = createGoal;
/* =========================
   GET ALL GOALS (USER)
========================= */
const getGoals = async (req, res) => {
    try {
        const goals = await Goal_1.default.find({ userId: req.userId });
        res.json(goals);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getGoals = getGoals;
/* =========================
   UPDATE GOAL
========================= */
const updateGoal = async (req, res) => {
    try {
        const goal = await Goal_1.default.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        // Ownership check
        if (goal.userId !== req.userId) {
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
                goal[field] = req.body[field];
            }
        });
        await goal.save();
        res.json(goal);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateGoal = updateGoal;
/* =========================
   DELETE GOAL
========================= */
const deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        // 1️⃣ Verify goal ownership
        const goal = await Goal_1.default.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        if (goal.userId !== req.userId) {
            return res.status(403).json({ message: "Not allowed" });
        }
        // 2️⃣ Delete all related activities
        await Activity_1.default.deleteMany({ goalId });
        // 3️⃣ Delete goal
        await Goal_1.default.findByIdAndDelete(goalId);
        res.json({ message: "Goal and related activities deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteGoal = deleteGoal;
