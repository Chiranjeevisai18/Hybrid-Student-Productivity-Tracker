"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const goal_routes_1 = __importDefault(require("./routes/goal.routes"));
const activity_routes_1 = __importDefault(require("./routes/activity.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const dailyActivity_routes_1 = __importDefault(require("./routes/dailyActivity.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ===== ROUTES ===== */
app.use("/api/auth", auth_routes_1.default);
app.use("/api/ai", ai_routes_1.default);
app.use("/api/goals", goal_routes_1.default);
app.use("/api/activities", activity_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/daily-activities", dailyActivity_routes_1.default);
/* ===== ERROR HANDLER (LAST) ===== */
app.use(errorHandler_1.errorHandler);
exports.default = app;
