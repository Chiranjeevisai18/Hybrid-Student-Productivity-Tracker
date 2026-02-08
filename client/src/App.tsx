import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Goals from "./pages/dashboard/Goals";
import GoalDetails from "./pages/GoalDetails";
import Analytics from "./pages/dashboard/Analytics";
import Profile from "./pages/auth/Profile";
import ActivitiesPage from "./pages/activities/ActivitiesPage";
import ActivityDetails from "./pages/activities/ActivityDetails";
import ChatPage from "./pages/chat/ChatPage";

function App() {
  return (
    <Routes>
      {/* 🌐 Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 🔐 Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="goals" element={<Goals />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="daily-activities" element={<ActivitiesPage />} />
        <Route path="ai" element={<ChatPage />} />
        <Route path="ai/:id" element={<ChatPage />} />
      </Route>
      <Route path="/goals/:id" element={<GoalDetails />} />
      <Route path="/dashboard/daily-activities/:id" element={<ActivityDetails />} />
    </Routes>
  );
}

export default App;
