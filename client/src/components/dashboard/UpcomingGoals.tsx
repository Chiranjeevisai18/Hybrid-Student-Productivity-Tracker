import { useNavigate } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";

const UpcomingGoals = () => {
  const { data, loading } = useAnalytics();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="fade-in rounded-2xl border border-border bg-card p-6 text-textMuted transition-all duration-300">
        Loading upcoming goals…
      </div>
    );
  }

  if (!data || data.upcomingGoals.length === 0) {
    return (
      <div className="fade-in rounded-2xl border border-border/50 bg-card p-6 text-textSecondary text-center">
        🎉 No upcoming deadlines
      </div>
    );
  }

  return (
    <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-glow transition-all duration-300 hover:border-primary/40">
      <h3 className="text-lg font-semibold text-textPrimary mb-4">
        Upcoming Goals
      </h3>

      <ul className="space-y-3">
        {data.upcomingGoals.map((goal) => (
          <li
            key={goal.id}
            onClick={() => navigate(`/goals/${goal.id}`)}
            className="
              cursor-pointer
              rounded-lg border border-border p-3
              transition
              hover:border-primary/40
              hover:bg-accent/5
            "
          >
            <p className="font-medium text-textPrimary">
              {goal.title}
            </p>
            <p className="text-xs text-textSecondary">
              Due by {goal.deadline}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingGoals;
