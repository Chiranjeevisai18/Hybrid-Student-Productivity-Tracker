"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middleware/validate");
const auth_1 = require("../middleware/auth");
const auth_controller_2 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/register", (0, validate_1.validate)((req) => {
    const errors = [];
    if (!req.body.name)
        errors.push("Name is required");
    if (!req.body.email || !req.body.email.includes("@"))
        errors.push("Valid email required");
    if (!req.body.password || req.body.password.length < 6)
        errors.push("Password must be at least 6 characters");
    return errors;
}), auth_controller_1.register);
router.post("/login", (0, validate_1.validate)((req) => {
    const errors = [];
    if (!req.body.email)
        errors.push("Email is required");
    if (!req.body.password)
        errors.push("Password is required");
    return errors;
}), auth_controller_1.login);
/* 🔥 NEW ROUTE */
router.get("/me", auth_1.auth, auth_controller_1.me);
router.patch("/profile", auth_1.auth, auth_controller_2.updateProfile);
exports.default = router;
