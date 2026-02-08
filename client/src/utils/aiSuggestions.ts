import type { Goal } from "../types/goals";
import type { Activity } from "../types/activity";

export const generateAIPrompt = (
  goals: Goal[],
  activities: Activity[],
  section: "dashboard" | "goals" | "analytics"
): string => {
  const completedToday = activities.filter(
    (a) =>
      a.completed &&
      a.lastUpdated === new Date().toISOString().split("T")[0]
  ).length;

  const totalActivities = activities.length;
  const pendingGoals = goals.filter((g) => g.progress < 100).map((g) => g.title);

  let context = "";

  switch (section) {
    case "dashboard":
      context = `
        User has completed ${completedToday} activities today out of ${totalActivities} total recorded.
        Pending goals: ${pendingGoals.join(", ")}.
        Focus: Give 3 short, punchy motivation tips for today's productivity.
      `;
      break;
    case "goals":
      context = `
        User has ${goals.length} goals. ${pendingGoals.length} are in progress.
        Focus: Suggest strategies to break down these specific goals into smaller tasks.
      `;
      break;
    case "analytics":
      context = `
        User has completed ${completedToday} activities today.
        Focus: Analyze this activity level and suggest how to improve consistency.
      `;
      break;
    default:
      context = "Focus: General productivity advice.";
  }

  return `
    You are a productivity expert for students.
    Context: ${context}
    Task: Provide 3 short, actionable bullet points as advice.
    Format: Plain text, no markdown, just bullet points.
  `;
};

