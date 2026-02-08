import { useState, useEffect } from "react";
import type { Goal } from "../../types/goals";
import { useProductivity } from "../../context/ProductivityContext";

const snapToFive = (val: number) => Math.round(val / 5) * 5;

const GoalProgressControl = ({ goal }: { goal: Goal }) => {
  const { updateGoalProgress } = useProductivity();
  const [value, setValue] = useState(goal.progress);

  useEffect(() => {
    setValue(goal.progress);
  }, [goal.progress]);

  const commitProgress = () => {
    updateGoalProgress(goal.id, snapToFive(value));
  };

  const isCompleted = goal.progress === 100;

  return (
    <div
      className="
        fade-in 
        relative mx-auto max-w-4xl
        rounded-2xl border border-border
        bg-card p-6
        shadow-glow
        transition
      "
    >
      {/* subtle glow ring: removed or commented out to rely on shadow-glow and theme borders */}
      {/* <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/20" /> */}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-textPrimary">
          Progress
        </h2>

        {isCompleted && (
          <span
            className="
              rounded-full px-3 py-1 text-xs font-semibold
              bg-green-500/15 text-green-600 dark:text-green-400
              shadow-sm
            "
          >
            Completed 🎉
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-textSecondary">
        Completion:
        <span className="ml-1 font-medium text-textPrimary">
          {value}%
        </span>
      </p>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        disabled={isCompleted}
        onChange={(e) =>
          setValue(snapToFive(Number(e.target.value)))
        }
        onMouseUp={commitProgress}
        onTouchEnd={commitProgress}
        className={`
          mt-5 w-full cursor-pointer
          accent-primary
          ${isCompleted ? "opacity-50 cursor-not-allowed" : ""}
        `}
      />

      {!isCompleted && (
        <p className="mt-2 text-xs text-textMuted">
          Drag to update progress (snaps to 5%)
        </p>
      )}
    </div>
  );
};

export default GoalProgressControl;
