import { Router } from "express";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  createDailyActivity,
  getDailyActivities,
  getDailyActivityById,
  updateDailyActivity,
  deleteDailyActivity,
} from "../controllers/dailyActivity.controller";

const router = Router();

/* =========================
   CREATE
========================= */
router.post(
  "/",
  auth,
  validate((req) => {
    const errors: string[] = [];
    if (!req.body.title) errors.push("Title is required");
    if (!req.body.date) errors.push("Date is required");
    return errors;
  }),
  createDailyActivity
);

/* =========================
   GET ALL
========================= */
router.get("/", auth, getDailyActivities);

/* =========================
   GET ONE
========================= */
router.get("/:id", auth, getDailyActivityById);

/* =========================
   UPDATE
========================= */
router.patch("/:id", auth, updateDailyActivity);

/* =========================
   DELETE
========================= */
router.delete("/:id", auth, deleteDailyActivity);

export default router;
