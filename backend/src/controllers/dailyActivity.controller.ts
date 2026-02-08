import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import DailyActivity from "../models/DailyActivity";

/* =========================
   CREATE
========================= */
export const createDailyActivity = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, notes, links, images, date } = req.body;

    const activity = await DailyActivity.create({
      userId: req.userId,
      title,
      notes,
      links,
      images,
      date,
    });

    res.json(activity);
    console.log("Created Daily Activity:", activity);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ALL (USER)
========================= */
export const getDailyActivities = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const activities = await DailyActivity.find({
      userId: req.userId,
    }).sort({ date: -1, createdAt: -1 });

    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET ONE
========================= */
export const getDailyActivityById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const activity = await DailyActivity.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    res.json(activity);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE
========================= */
/* =========================
   UPDATE
========================= */
export const updateDailyActivity = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const updated = await DailyActivity.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Activity not found" });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE
========================= */
export const deleteDailyActivity = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const deleted = await DailyActivity.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted)
      return res.status(404).json({ message: "Activity not found" });

    res.json({ message: "Activity deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
