import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
  ai?: boolean;
  end?: boolean;
}

const SidebarItem = ({ icon, label, to, collapsed, ai, end }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
        transition-all duration-300
        ${isActive
          ? ai
            ? "text-primary shadow-sm bg-primary/10 ring-1 ring-primary/20"
            : "bg-surfaceElevated text-primary border-l-4 border-primary shadow-sm"
          : "text-textSecondary hover:bg-surfaceElevated hover:text-textPrimary"
        }
      `
      }
    >
      <div className="text-xl">{icon}</div>

      {!collapsed && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarItem;
