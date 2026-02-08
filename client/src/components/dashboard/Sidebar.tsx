import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiHome, FiTarget, FiActivity, FiLogOut, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/dashboard/goals", label: "Goals", icon: FiTarget },
    { path: "/dashboard/daily-activities", label: "Daily Activities", icon: FiActivity },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col transition-colors duration-300">

      {/* Brand */}
      <div className="p-6 border-b border-border/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Productivity
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"} // Only exact match for root dashboard
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-textSecondary hover:bg-surface hover:text-textPrimary"
              }`
            }
          >
            <item.icon className="text-lg" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-border/50 bg-surface/30">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <FiUser size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-textPrimary truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-textSecondary truncate">
              {user?.email || "student@example.com"}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-cardElevated border border-border py-2.5 text-sm font-medium text-textSecondary transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-95"
        >
          <FiLogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
