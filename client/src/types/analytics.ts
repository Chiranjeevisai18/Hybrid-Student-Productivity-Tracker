export type Analytics = {
  goalsCount: number;
  totalActivities: number;
  completedActivities: number;
  totalMinutes: number;
  activityCompletionRate: number;
  weeklyProductivity: Record<string, number>;
  upcomingGoals: {
    id: string;
    title: string;
    deadline: string;
  }[];
  productivityScore: number;
};
