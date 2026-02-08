"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ActivitySchema = new mongoose_1.Schema({
    goalId: { type: String, required: true },
    title: { type: String, required: true },
    estimatedMinutes: {
        type: Number,
        required: true,
    },
    spentMinutes: {
        type: Number,
        default: 0, // ✅ critical
    },
    completed: {
        type: Boolean,
        default: false, // ✅ critical
    },
    lastUpdated: {
        type: String,
    },
    userId: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Activity", ActivitySchema);
