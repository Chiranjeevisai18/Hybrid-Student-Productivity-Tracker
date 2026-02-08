import { useState } from "react";
import {
  FiHome,
  FiTarget,
  FiList,
  FiBarChart2,
  FiCpu,
  FiLogOut,
  FiMenu,
  FiUser,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutConfirmModal from "../../pages/dashboard/LogoutConfirmModal";
import { useTheme } from "../../context/ThemeContext";

import DailyPlanModal from "../dashboard/DailyPlanModal";
import { FiCalendar } from "react-icons/fi";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDailyPlanModal, setShowDailyPlanModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          bg-surface
          border-r border-border
          text-textPrimary flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-72"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-none
        `}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-6 mb-2">
          {!collapsed && (
            <h1 className="text-xl font-bold text-primary truncate">
              Student Tracker
            </h1>
          )}

          <button
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-textSecondary hover:bg-surfaceElevated hover:text-primary transition-all"
            onClick={toggleSidebar}
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          <SidebarItem to="/dashboard" label="Dashboard" icon={<FiHome />} collapsed={collapsed} end />
          <SidebarItem to="/dashboard/goals" label="Goals" icon={<FiTarget />} collapsed={collapsed} />
          <SidebarItem to="/dashboard/daily-activities" label="Activities" icon={<FiList />} collapsed={collapsed} />
          <SidebarItem to="/dashboard/analytics" label="Analytics" icon={<FiBarChart2 />} collapsed={collapsed} />
          <SidebarItem to="/dashboard/ai" label="AI Assistant" icon={<FiCpu />} collapsed={collapsed} ai />

          <button
            onClick={() => setShowDailyPlanModal(true)}
            className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                transition-all duration-300 text-left
                text-textSecondary hover:bg-surfaceElevated hover:text-textPrimary
            `}
          >
            <div className="text-xl"><FiCalendar /></div>
            {!collapsed && <span className="text-sm font-medium">Daily Plan</span>}
          </button>
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-border bg-surface/50 space-y-3">

          {/* User Info (Clickable to Profile) */}
          <div
            onClick={() => navigate("/dashboard/profile")}
            className={`
                    flex items-center gap-3 p-2 rounded-xl cursor-pointer
                    hover:bg-surfaceElevated transition-colors group
                    ${collapsed ? "justify-center" : ""}
                `}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-colors">
              <FiUser size={20} />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-textPrimary truncate">{user?.name || "Student"}</p>
                <p className="text-xs text-textSecondary truncate">{user?.email}</p>
              </div>
            )}
          </div>

          {/* Actions: Theme & Logout */}
          <div className={`flex items-center gap-2 ${collapsed ? "flex-col" : ""}`}>
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-textSecondary hover:bg-surfaceElevated hover:text-textPrimary transition-all border border-transparent hover:border-border"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
              {!collapsed && <span className="text-sm font-medium">Theme</span>}
            </button>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-red-500/80 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 border border-transparent transition-all"
              title="Logout"
            >
              <FiLogOut size={18} />
              {!collapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-border text-textPrimary shadow-lg"
        onClick={toggleMobile}
      >
        <FiMenu size={24} />
      </button>

      {showLogoutModal && (
        <LogoutConfirmModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {showDailyPlanModal && (
        <DailyPlanModal onClose={() => setShowDailyPlanModal(false)} />
      )}

    </>
  );
};

export default Sidebar;
