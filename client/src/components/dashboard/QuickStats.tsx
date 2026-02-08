import { useAnalytics } from "../../hooks/useAnalytics";
import Skeleton from "../../ui/Skeleton";

const QuickStats = () => {
  const { data, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Stat label="Goals" value={data?.goalsCount} />
      <Stat
        label="Activities"
        value={`${data?.completedActivities}/${data?.totalActivities}`}
      />
      <Stat label="Focus Minutes" value={`${data?.totalMinutes} min`} />
      <Stat
        label="Completion Rate"
        value={`${data?.activityCompletionRate}%`}
      />
    </div>
  );
};

const Stat = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="fade-in rounded-xl border border-border bg-card p-4 transition-all duration-300 shadow-glow hover:border-primary/40 hover:-translate-y-1 group">
    <p className="text-xs text-textMuted group-hover:text-primary/80 transition-colors">{label}</p>
    <p className="mt-2 text-lg font-semibold text-textPrimary">
      {value ?? "--"}
    </p>
  </div>
);

export default QuickStats;
