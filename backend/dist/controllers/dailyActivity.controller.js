"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDailyActivity = exports.updateDailyActivity = exports.getDailyActivityById = exports.getDailyActivities = exports.createDailyActivity = void 0;
const DailyActivity_1 = __importDefault(require("../models/DailyActivity"));
/* =========================
   CREATE
========================= */
const createDailyActivity = async (req, res) => {
    try {
        const { title, notes, links, images, date } = req.body;
        const activity = await DailyActivity_1.default.create({
            userId: req.userId,
            title,
            notes,
            links,
            images,
            date,
        });
        res.json(activity);
        console.log("Created Daily Activity:", activity);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createDailyActivity = createDailyActivity;
/* =========================
   GET ALL (USER)
========================= */
const getDailyActivities = async (req, res) => {
    try {
        const activities = await DailyActivity_1.default.find({
            userId: req.userId,
        }).sort({ date: -1, createdAt: -1 });
        res.json(activities);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getDailyActivities = getDailyActivities;
/* =========================
   GET ONE
========================= */
const getDailyActivityById = async (req, res) => {
    try {
        const activity = await DailyActivity_1.default.findOne({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!activity)
            return res.status(404).json({ message: "Activity not found" });
        res.json(activity);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getDailyActivityById = getDailyActivityById;
/* =========================
   UPDATE
========================= */
const updateDailyActivity = async (req, res) => {
    try {
        const updated = await DailyActivity_1.default.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Activity not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateDailyActivity = updateDailyActivity;
/* =========================
   DELETE
========================= */
const deleteDailyActivity = async (req, res) => {
    try {
        const deleted = await DailyActivity_1.default.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!deleted)
            return res.status(404).json({ message: "Activity not found" });
        res.json({ message: "Activity deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteDailyActivity = deleteDailyActivity;
