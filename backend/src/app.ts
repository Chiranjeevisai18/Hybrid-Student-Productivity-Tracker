import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import aiRoutes from "./routes/ai.routes";
import goalRoutes from "./routes/goal.routes";
import activityRoutes from "./routes/activity.routes";
import analyticsRoutes from "./routes/analytics.routes";
import dailyActivityRoutes from "./routes/dailyActivity.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/daily-activities", dailyActivityRoutes);
/* ===== ERROR HANDLER (LAST) ===== */
app.use(errorHandler);

export default app;
