import type { Goal } from "../../types/goals";

const GoalOverview = ({ goal }: { goal: Goal }) => {
  return (
    <div
      className="
        fade-in
        relative mx-auto max-w-4xl
        rounded-2xl border border-border
        bg-card p-6
        shadow-glow
      "
    >
      {/* glow ring (remove or adjust for theme, keeping simple for now) */}
      {/* <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/20" /> */}

      <h1 className="text-2xl font-semibold text-textPrimary">
        {goal.title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-3 text-sm text-textSecondary">
        <span className="rounded-lg bg-surfaceElevated px-3 py-1 border border-border/50">
          {goal.category}
        </span>
        <span className="rounded-lg bg-surfaceElevated px-3 py-1 border border-border/50">
          {goal.type}
        </span>
        <span className="rounded-lg bg-surfaceElevated px-3 py-1 border border-border/50">
          {goal.startDate} → {goal.endDate}
        </span>
      </div>

      <p className="mt-4 text-sm text-textSecondary">
        Progress:
        <span className="ml-1 font-medium text-textPrimary">
          {goal.progress}%
        </span>
      </p>
    </div>
  );
};

export default GoalOverview;
