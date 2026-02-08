import { useState } from "react";
import { useProductivity } from "../../context/ProductivityContext";
import type { Activity } from "../../types/activity";

type Props = {
  goalId: string;
  onClose: () => void;
};

const AddActivityModal = ({ goalId, onClose }: Props) => {
  const { addActivity } = useProductivity();

  const [title, setTitle] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);

  const handleSubmit = () => {
    if (!title || estimatedMinutes <= 0) return;

    const newActivity: Activity = {
      id: crypto.randomUUID(),
      goalId,
      title,
      estimatedMinutes,
      spentMinutes: 0,
      completed: false,
    };

    addActivity(newActivity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-sm">
      <div
        className="
          fade-in
          w-full max-w-md rounded-2xl
          bg-card p-6
          shadow-glow
          border border-border
        "
      >
        <h2 className="text-lg font-semibold text-textPrimary">
          Add Activity
        </h2>

        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Activity title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full rounded-lg
              border border-border
              bg-surfaceElevated px-3 py-2
              text-textPrimary
              placeholder-textMuted
              focus:outline-none focus:ring-1 focus:ring-primary
            "
          />

          <input
            type="number"
            min={5}
            step={5}
            value={estimatedMinutes}
            onChange={(e) =>
              setEstimatedMinutes(Number(e.target.value))
            }
            className="
              w-full rounded-lg
              border border-border
              bg-surfaceElevated px-3 py-2
              text-textPrimary
              focus:outline-none focus:ring-1 focus:ring-primary
            "
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              rounded-lg bg-blue-600 px-4 py-2
              text-sm font-medium text-white
              hover:bg-blue-700
              hover:shadow-lg hover:shadow-blue-500/25
              transition-all
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
