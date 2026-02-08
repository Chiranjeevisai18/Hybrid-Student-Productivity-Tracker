import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";
import { validate } from "../middleware/validate";

const router = Router();

/* =========================
   CREATE GOAL
========================= */
router.post(
  "/",
  auth,
  validate((req) => {
    const errors: string[] = [];

    if (!req.body.title) errors.push("Title is required");
    if (!req.body.category) errors.push("Category is required");
    if (!req.body.type) errors.push("Type is required");
    if (!req.body.startDate) errors.push("Start date is required");
    if (!req.body.endDate) errors.push("End date is required");

    return errors;
  }),
  createGoal
);

/* =========================
   READ GOALS
========================= */
router.get("/", auth, getGoals);

/* =========================
   UPDATE GOAL
========================= */
router.patch("/:id", auth, updateGoal);

/* =========================
   DELETE GOAL
========================= */
router.delete("/:id", auth, deleteGoal);

export default router;
