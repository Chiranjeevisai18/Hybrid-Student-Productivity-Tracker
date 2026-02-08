"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.me = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* =========================
   REGISTER
========================= */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User_1.default.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Email already exists" });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({ name, email, password: hashed });
        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        res.json({ message: "User registered", user: safeUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
/* =========================
   LOGIN
========================= */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Wrong password" });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        res.json({ token, user: safeUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
/* =========================
   ME (🔥 REQUIRED FOR REFRESH)
========================= */
const me = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.me = me;
const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ message: "Name is too short" });
        }
        const user = await User_1.default.findByIdAndUpdate(req.userId, { name }, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProfile = updateProfile;
