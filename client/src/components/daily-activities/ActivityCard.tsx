import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import type { DailyActivity } from "../../types/dailyActivity";
import { useDailyActivities } from "../../context/DailyActivityContext";

const ActivityCard = ({ activity }: { activity: DailyActivity }) => {
  const navigate = useNavigate();
  const { deleteActivity } = useDailyActivities();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const confirmed = confirm(
      "Delete this activity? This cannot be undone."
    );
    if (!confirmed) return;

    await deleteActivity(activity.id);
  };

  return (
    <div
      onClick={() =>
        navigate(`/dashboard/daily-activities/${activity.id}`)
      }
      className="
        fade-in cursor-pointer
        rounded-2xl
        border border-border
        bg-card
        p-5
        transition-all duration-300
        shadow-glow
        hover:border-primary/40
        hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between">
        <h3 className="text-textPrimary font-semibold">
          {activity.title}
        </h3>

        <button
          onClick={handleDelete}
          className="
            text-textMuted
            hover:text-red-400
            transition
          "
        >
          <FiTrash2 size={14} />
        </button>
      </div>

      {activity.notes && (
        <p className="mt-2 text-sm text-textSecondary line-clamp-2">
          {activity.notes}
        </p>
      )}

      <div className="mt-3 text-xs text-textMuted">
        {activity.date}
      </div>
    </div>
  );
};

export default ActivityCard;
