"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const goal_controller_1 = require("../controllers/goal.controller");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
/* =========================
   CREATE GOAL
========================= */
router.post("/", auth_1.auth, (0, validate_1.validate)((req) => {
    const errors = [];
    if (!req.body.title)
        errors.push("Title is required");
    if (!req.body.category)
        errors.push("Category is required");
    if (!req.body.type)
        errors.push("Type is required");
    if (!req.body.startDate)
        errors.push("Start date is required");
    if (!req.body.endDate)
        errors.push("End date is required");
    return errors;
}), goal_controller_1.createGoal);
/* =========================
   READ GOALS
========================= */
router.get("/", auth_1.auth, goal_controller_1.getGoals);
/* =========================
   UPDATE GOAL
========================= */
router.patch("/:id", auth_1.auth, goal_controller_1.updateGoal);
/* =========================
   DELETE GOAL
========================= */
router.delete("/:id", auth_1.auth, goal_controller_1.deleteGoal);
exports.default = router;
