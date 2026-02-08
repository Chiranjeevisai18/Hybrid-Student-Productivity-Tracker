import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-textPrimary transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed((prev) => !prev)}
      />

      <main
        className={`
          ml-0 lg:ml-0
          ${collapsed ? "lg:ml-20" : "lg:ml-72"}
          p-4 lg:p-8
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
