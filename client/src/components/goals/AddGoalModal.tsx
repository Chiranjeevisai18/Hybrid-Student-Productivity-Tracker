import { useState } from "react";
import type { Goal, GoalCategory, GoalType } from "../../types/goals";
import { useProductivity } from "../../context/ProductivityContext";

type Props = {
  onClose: () => void;
};

const AddGoalModal = ({ onClose }: Props) => {
  const { addGoal } = useProductivity();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GoalCategory>("Academics");
  const [type, setType] = useState<GoalType>("Short-term");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!title || !startDate || !endDate) return;

    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title,
      category,
      type,
      progress: 0,
      startDate,
      endDate,
    };

    addGoal(newGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-0">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/90 backdrop-blur-sm transition-colors duration-300"
        onClick={onClose}
      />

      <div className="relative z-10 fade-in w-full max-w-md rounded-2xl bg-surface border border-border p-6 shadow-glow">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">
          Create New Goal
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Goal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
                w-full rounded-lg bg-card border border-border px-3 py-2.5 
                text-textPrimary placeholder-textMuted
                focus:outline-none focus:ring-1 focus:ring-primary
                transition-all
            "
          />

          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
              className="
                w-1/2 rounded-lg bg-card border border-border px-3 py-2.5 
                text-textPrimary
                focus:outline-none focus:ring-1 focus:ring-primary
                transition-all appearance-none cursor-pointer
              "
            >
              <option>Academics</option>
              <option>Fitness</option>
              <option>Skills</option>
              <option>Personal</option>
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value as GoalType)}
              className="
                w-1/2 rounded-lg bg-card border border-border px-3 py-2.5 
                text-textPrimary
                focus:outline-none focus:ring-1 focus:ring-primary
                transition-all appearance-none cursor-pointer
              "
            >
              <option>Short-term</option>
              <option>Long-term</option>
            </select>
          </div>

          <div className="flex gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="
                w-1/2 rounded-lg bg-card border border-border px-3 py-2.5 
                text-textPrimary placeholder-textMuted
                focus:outline-none focus:ring-1 focus:ring-primary
                transition-all
              "
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="
                w-1/2 rounded-lg bg-card border border-border px-3 py-2.5 
                text-textPrimary placeholder-textMuted
                focus:outline-none focus:ring-1 focus:ring-primary
                transition-all
              "
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-textSecondary hover:text-textPrimary transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
                rounded-lg bg-blue-600 px-4 py-2 
                text-sm font-medium text-white 
                hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25
                transition-all
            "
          >
            Create Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
