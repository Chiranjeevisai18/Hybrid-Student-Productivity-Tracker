"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/suggest", auth_1.auth, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text)
            return res.status(400).json({ message: "Missing text" });
        const response = await axios_1.default.post(process.env.AI_FUNCTION_URL, { text });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
