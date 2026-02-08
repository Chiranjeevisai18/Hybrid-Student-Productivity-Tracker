import type { Activity } from "../../types/activity";
import { useProductivity } from "../../context/ProductivityContext";

import { useAuth } from "../../context/AuthContext";

const ActivityItem = ({ activity }: { activity: Activity }) => {
  const { toggleActivity, logTime } = useProductivity();
  const { refreshUser } = useAuth();

  const handleToggle = async () => {
    await toggleActivity(activity.id);
    if (!activity.completed) {
      // If we just marked it as complete, refresh XP
      await refreshUser();
    }
  };

  const handleLog = (mins: number) => {
    if (activity.completed) return;

    const before = activity.spentMinutes;
    const after = before + mins;

    logTime(activity.id, mins);

    // Auto-complete ONLY if threshold is crossed now
    if (
      before < activity.estimatedMinutes &&
      after >= activity.estimatedMinutes
    ) {
      toggleActivity(activity.id).then(() => refreshUser());
    }
  };

  return (
    <div
      className="
        fade-in rounded-xl border border-border
        bg-cardElevated p-4
        space-y-4
        hover:border-primary/30 transition-colors
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4
            className={`font-medium ${activity.completed
              ? "line-through text-textMuted"
              : "text-textPrimary"
              }`}
          >
            {activity.title}
          </h4>

          <p className="text-xs text-textSecondary">
            {activity.spentMinutes} / {activity.estimatedMinutes} mins
          </p>
        </div>

        <input
          type="checkbox"
          checked={activity.completed}
          onChange={handleToggle}
          className="accent-primary w-5 h-5 cursor-pointer"
        />
      </div>

      {/* Time Logger Buttons */}
      {!activity.completed && (
        <div className="flex gap-3">
          {[15, 30].map((mins) => (
            <button
              key={mins}
              onClick={() => handleLog(mins)}
              className="
                rounded-lg border border-primary/30
                bg-primary/10 px-3 py-1.5
                text-xs font-medium text-primary
                transition
                hover:bg-primary/20
                hover:shadow-lg hover:shadow-primary/10
              "
            >
              +{mins} min
            </button>
          ))}
        </div>
      )}

      {/* Completed Badge */}
      {activity.completed && (
        <span
          className="
            inline-block rounded-full
            border border-green-500/30
            bg-green-500/10 px-3 py-1
            text-xs font-medium text-green-600 dark:text-green-400
            shadow-sm
          "
        >
          Completed 🎉
        </span>
      )}
    </div>
  );
};

export default ActivityItem;
