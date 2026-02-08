import { useAnalytics } from "../../hooks/useAnalytics";

const TodayFocus = () => {
  const { data, loading } = useAnalytics();

  let message = "Stay consistent today 💪";

  if (!loading && data) {
    if (data.activityCompletionRate < 40) {
      message = "Focus on completing at least one activity today 🎯";
    } else if (data.productivityScore > 80) {
      message = "Great momentum! Keep pushing 🚀";
    }
  }

  return (
    <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-glow transition-all duration-300 hover:scale-[1.01] hover:border-primary/30">
      <h2 className="text-lg font-semibold text-textPrimary">Today’s Focus</h2>
      <p className="mt-2 text-textSecondary">{message}</p>
    </div>
  );
};

export default TodayFocus;
