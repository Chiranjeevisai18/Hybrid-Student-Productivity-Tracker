export type Activity = {
  id: string;
  goalId: string;
  title: string;
  estimatedMinutes: number;
  spentMinutes: number;
  completed: boolean;
  lastUpdated?: string; // ISO date string
};
