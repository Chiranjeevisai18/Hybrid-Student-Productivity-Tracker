"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GoalSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    progress: { type: Number, default: 0 }, // ✅ frontend-safe
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    userId: { type: String }, // later
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Goal", GoalSchema);
