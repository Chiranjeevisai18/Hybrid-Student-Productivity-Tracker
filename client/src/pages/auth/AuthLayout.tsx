import type { ReactNode } from "react";
import AuthLeftPanel from "../../components/auth/AuthLeftPanel";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-background flex overflow-hidden">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 shrink-0">
        <AuthLeftPanel />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full lg:w-1/2 flex-1 items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
