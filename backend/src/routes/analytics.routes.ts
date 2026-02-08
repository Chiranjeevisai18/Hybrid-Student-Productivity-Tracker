import { Router } from "express";
import { auth } from "../middleware/auth";
import { getAnalytics } from "../controllers/analytics.controller";

const router = Router();

router.get("/", auth, getAnalytics);

export default router;
