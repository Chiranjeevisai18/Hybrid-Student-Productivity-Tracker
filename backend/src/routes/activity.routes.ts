import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createActivity,
  getAllActivities,
  getActivitiesByGoal,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller";
import { validate } from "../middleware/validate";

const router = Router();

router.post(
  "/",
  auth,
  validate((req) => {
    const errors: string[] = [];
    if (!req.body.goalId) errors.push("goalId is required");
    if (!req.body.title) errors.push("Activity title is required");
    if (!req.body.estimatedMinutes)
      errors.push("estimatedMinutes is required");
    return errors;
  }),
  createActivity
);

router.get("/", auth, getAllActivities);          // 🔥 FIX
router.get("/:goalId", auth, getActivitiesByGoal);
router.patch("/:id", auth, updateActivity);
router.delete("/:id", auth, deleteActivity);

export default router;
