import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/client";

type User = {
  id: string;
  name: string;
  email: string;
  xp?: number;
  level?: number;
  badges?: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* 🔥 RESTORE USER ON REFRESH */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch("/auth/me")
      .then((user) => setUser(user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (name: string) => {
    const updatedUser = await apiFetch("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify({ name }),
    });

    setUser(updatedUser);
  };

  const refreshUser = async () => {
    try {
      const user = await apiFetch("/auth/me");
      setUser(user);
    } catch (error) {
      console.error("Failed to refresh user", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
