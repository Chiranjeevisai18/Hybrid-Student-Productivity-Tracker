import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Goal } from "../types/goals";
import type { Activity } from "../types/activity";
import { apiFetch } from "../api/client";

/* =========================
   CONTEXT TYPE
========================= */
type ProductivityContextType = {
  todayFocus: string;
  completedTasksToday: number;
  streak: number;
  productivityScore: number;

  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id" | "progress">) => Promise<void>;
  updateGoalProgress: (id: string, progress: number) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;

  activities: Activity[];
  addActivity: (
    activity: Omit<Activity, "id" | "spentMinutes" | "completed">
  ) => Promise<void>;
  toggleActivity: (id: string) => Promise<void>;
  logTime: (id: string, minutes: number) => Promise<void>;
};

/* =========================
   NORMALIZERS (CRITICAL)
========================= */
const normalizeGoal = (g: any): Goal => ({
  id: g._id ?? g.id,
  title: g.title,
  category: g.category,
  type: g.type,
  progress: g.progress ?? 0,
  startDate: g.startDate,
  endDate: g.endDate,
});

const normalizeActivity = (a: any): Activity => ({
  id: a._id ?? a.id,
  goalId: a.goalId,
  title: a.title,
  estimatedMinutes: a.estimatedMinutes,
  spentMinutes: a.spentMinutes ?? 0,
  completed: a.completed ?? false,
  lastUpdated: a.lastUpdated,
});

/* =========================
   CONTEXT
========================= */
const ProductivityContext =
  createContext<ProductivityContextType | null>(null);

/* =========================
   PROVIDER
========================= */
export const ProductivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  /* =========================
     INITIAL FETCH
  ========================= */
  useEffect(() => {
    apiFetch("/goals")
      .then((data) => setGoals(data.map(normalizeGoal)))
      .catch(console.error);

    apiFetch("/activities")
      .then((data) => setActivities(data.map(normalizeActivity)))
      .catch(console.error);
  }, []);

  /* =========================
     GOAL ACTIONS
  ========================= */
  const addGoal = async (
    goal: Omit<Goal, "id" | "progress">
  ) => {
    const created = await apiFetch("/goals", {
      method: "POST",
      body: JSON.stringify(goal),
    });

    setGoals((prev) => [...prev, normalizeGoal(created)]);
  };

  const updateGoalProgress = async (
    id: string,
    progress: number
  ) => {
    const updated = await apiFetch(`/goals/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ progress }),
    });

    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? normalizeGoal(updated) : g
      )
    );
  };

  const deleteGoal = async (id: string) => {
    await apiFetch(`/goals/${id}`, { method: "DELETE" });

    setGoals((prev) => prev.filter((g) => g.id !== id));
    setActivities((prev) =>
      prev.filter((a) => a.goalId !== id)
    );
  };

  /* =========================
     ACTIVITY ACTIONS
  ========================= */
  const addActivity = async (
    activity: Omit<Activity, "id" | "spentMinutes" | "completed">
  ) => {
    const created = await apiFetch("/activities", {
      method: "POST",
      body: JSON.stringify(activity),
    });

    setActivities((prev) => [
      ...prev,
      normalizeActivity(created),
    ]);
  };

  const toggleActivity = async (id: string) => {
    const activity = activities.find((a) => a.id === id);
    if (!activity) return;

    const updated = await apiFetch(`/activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !activity.completed,
      }),
    });

    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? normalizeActivity(updated) : a
      )
    );
  };

  const logTime = async (id: string, minutes: number) => {
    const activity = activities.find((a) => a.id === id);
    if (!activity) return;

    const today = new Date().toISOString().split("T")[0];
    const newSpent = activity.spentMinutes + minutes;

    const updated = await apiFetch(`/activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        spentMinutes: newSpent,
        lastUpdated: today,
      }),
    });

    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? normalizeActivity(updated) : a
      )
    );
  };

  /* =========================
     AUTO PROGRESS SYNC
  ========================= */
  useEffect(() => {
    goals.forEach((goal) => {
      if (!goal.id) return;

      const related = activities.filter(
        (a) => a.goalId === goal.id
      );

      if (related.length === 0) return;

      const completed = related.filter(
        (a) => a.completed
      ).length;

      const progress = Math.round(
        (completed / related.length) * 100
      );

      if (goal.progress !== progress) {
        updateGoalProgress(goal.id, progress);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  /* =========================
     CONTEXT VALUE
  ========================= */
  const value: ProductivityContextType = {
    todayFocus: "Stay consistent",
    completedTasksToday: activities.filter(
      (a) => a.completed
    ).length,
    streak: 6,
    productivityScore: Math.round(
      goals.reduce((acc, g) => acc + g.progress, 0) /
        (goals.length || 1)
    ),

    goals,
    addGoal,
    updateGoalProgress,
    deleteGoal,

    activities,
    addActivity,
    toggleActivity,
    logTime,
  };

  return (
    <ProductivityContext.Provider value={value}>
      {children}
    </ProductivityContext.Provider>
  );
};

/* =========================
   HOOK
========================= */
export const useProductivity = () => {
  const context = useContext(ProductivityContext);
  if (!context) {
    throw new Error(
      "useProductivity must be used inside ProductivityProvider"
    );
  }
  return context;
};
