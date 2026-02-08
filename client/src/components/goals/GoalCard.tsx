import { useNavigate } from "react-router-dom";
import type { Goal } from "../../types/goals";
import { useProductivity } from "../../context/ProductivityContext";
import { FiTrash2 } from "react-icons/fi";

const GoalCard = ({ goal }: { goal: Goal }) => {
  const navigate = useNavigate();
  const { deleteGoal } = useProductivity();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 🔥 prevents navigation

    const confirm = window.confirm(
      "Delete this goal and all its activities?"
    );
    if (!confirm) return;

    await deleteGoal(goal.id);
  };

  return (
    <div
      onClick={() => navigate(`/goals/${goal.id}`)}
      className="
        fade-in
        relative
        cursor-pointer
        rounded-2xl bg-card
        border border-border
        p-6
        transition-all duration-300
        shadow-glow
        hover:border-primary/40
        hover:-translate-y-1
      "
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="
          absolute top-4 right-4
          rounded-lg p-2
          text-textSecondary
          hover:text-red-400
          hover:bg-red-500/10
          transition
        "
        title="Delete goal"
      >
        <FiTrash2 size={16} />
      </button>

      <h3 className="text-lg font-semibold text-textPrimary">
        {goal.title}
      </h3>

      <p className="mt-1 text-sm text-textSecondary">
        {goal.category}
      </p>
    </div>
  );
};

export default GoalCard;
