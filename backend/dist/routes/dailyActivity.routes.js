"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const dailyActivity_controller_1 = require("../controllers/dailyActivity.controller");
const router = (0, express_1.Router)();
/* =========================
   CREATE
========================= */
router.post("/", auth_1.auth, (0, validate_1.validate)((req) => {
    const errors = [];
    if (!req.body.title)
        errors.push("Title is required");
    if (!req.body.date)
        errors.push("Date is required");
    return errors;
}), dailyActivity_controller_1.createDailyActivity);
/* =========================
   GET ALL
========================= */
router.get("/", auth_1.auth, dailyActivity_controller_1.getDailyActivities);
/* =========================
   GET ONE
========================= */
router.get("/:id", auth_1.auth, dailyActivity_controller_1.getDailyActivityById);
/* =========================
   UPDATE
========================= */
router.patch("/:id", auth_1.auth, dailyActivity_controller_1.updateDailyActivity);
/* =========================
   DELETE
========================= */
router.delete("/:id", auth_1.auth, dailyActivity_controller_1.deleteDailyActivity);
exports.default = router;
