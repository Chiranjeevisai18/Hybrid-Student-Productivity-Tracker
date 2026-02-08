"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const activity_controller_1 = require("../controllers/activity.controller");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
router.post("/", auth_1.auth, (0, validate_1.validate)((req) => {
    const errors = [];
    if (!req.body.goalId)
        errors.push("goalId is required");
    if (!req.body.title)
        errors.push("Activity title is required");
    if (!req.body.estimatedMinutes)
        errors.push("estimatedMinutes is required");
    return errors;
}), activity_controller_1.createActivity);
router.get("/", auth_1.auth, activity_controller_1.getAllActivities); // 🔥 FIX
router.get("/:goalId", auth_1.auth, activity_controller_1.getActivitiesByGoal);
router.patch("/:id", auth_1.auth, activity_controller_1.updateActivity);
router.delete("/:id", auth_1.auth, activity_controller_1.deleteActivity);
exports.default = router;
