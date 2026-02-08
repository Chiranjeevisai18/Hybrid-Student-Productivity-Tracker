export type GoalCategory =
  | "Academics"
  | "Fitness"
  | "Skills"
  | "Personal";

export type GoalType =
  | "Short-term"
  | "Long-term";

export type Goal = {
  id: string;
  title: string;
  category: GoalCategory;
  type: GoalType;
  progress: number; // 0 - 100
  startDate: string; // ISO format
  endDate: string;   // ISO format
};
