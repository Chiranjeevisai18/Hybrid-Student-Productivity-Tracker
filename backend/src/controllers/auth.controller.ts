import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";
import redis from "../config/redis";

/* =========================
   REGISTER
========================= */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ message: "User registered", user: safeUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ token, user: safeUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================
   ME (🔥 REQUIRED FOR REFRESH)
========================= */
/* =========================
   ME (🔥 REDIS CACHED)
========================= */
export const me = async (req: AuthRequest, res: Response) => {
  try {
    // Check Cache (Strict Timeout)
    try {
      const cachedUser = await Promise.race([
        redis.get(`user:${req.userId}`),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500))
      ]);
      if (cachedUser) {
        return res.json(JSON.parse(cachedUser as string));
      }
    } catch (cacheErr) {
      console.warn("User Cache Skip:", (cacheErr as Error).message);
    }

    const user = await User.findById(req.userId).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Set Cache (Expire in 1 hour) (Graceful)
    try {
      await redis.set(`user:${req.userId}`, JSON.stringify(user), "EX", 3600);
    } catch (cacheErr) {
      console.warn("User Cache Save Failed:", cacheErr);
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Name is too short" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name },
      { new: true }
    ).select("-password -__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Invalidate Cache (Graceful)
    try {
      await redis.del(`user:${req.userId}`);
      await redis.set(`user:${req.userId}`, JSON.stringify(updatedUser), "EX", 3600);
    } catch (cacheErr) {
      console.warn("User Cache Invalidation Failed:", cacheErr);
    }

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

