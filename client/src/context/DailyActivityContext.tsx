import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { useAuth } from "./AuthContext";
import type { DailyActivity } from "../types/dailyActivity";

type ContextType = {
  activities: DailyActivity[];
  addActivity: (data: Omit<DailyActivity, "id">) => Promise<void>;
  updateActivity: (id: string, data: Partial<DailyActivity>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
};

const DailyActivityContext = createContext<ContextType | null>(null);

export const DailyActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const [pendingDelete, setPendingDelete] = useState<DailyActivity | null>(null);


  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setActivities([]);
      return;
    }

    apiFetch("/daily-activities")
      .then((data) =>
        setActivities(
          data.map((a: any) => ({
            id: a._id,
            ...a,
          }))
        )
      )
      .catch(console.error);
  }, [user]);

  const addActivity = async (data: Omit<DailyActivity, "id">) => {
    const created = await apiFetch("/daily-activities", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setActivities((prev) => [
      { id: created._id, ...created },
      ...prev,
    ]);
  };

  const updateActivity = async (id: string, data: Partial<DailyActivity>) => {
    const updated = await apiFetch(`/daily-activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { id, ...updated } : a))
    );
  };

  const deleteActivity = async (id: string) => {
    await apiFetch(`/daily-activities/${id}`, { method: "DELETE" });
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <DailyActivityContext.Provider
      value={{ activities, addActivity, updateActivity, deleteActivity }}
    >
      {children}
    </DailyActivityContext.Provider>
  );
};

export const useDailyActivities = () => {
  const ctx = useContext(DailyActivityContext);
  if (!ctx) throw new Error("useDailyActivities must be used inside provider");
  return ctx;
};
