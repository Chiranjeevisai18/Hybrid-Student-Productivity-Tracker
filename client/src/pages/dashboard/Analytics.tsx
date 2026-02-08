import { useProductivity } from "../../context/ProductivityContext";
import TimePerGoalChart from "../../components/analytics/TimePerGoalChart";
import ActivityStatusChart from "../../components/analytics/ActivityStatusChart";
import ProductivityTrendChart from "../../components/analytics/ProductivityTrendChart";


const Analytics = () => {
  const { goals, activities, productivityScore } = useProductivity();

  const totalTimeSpent = activities.reduce(
    (acc, a) => acc + a.spentMinutes,
    0
  );

  const completedActivities = activities.filter(
    (a) => a.completed
  ).length;

  const pendingActivities =
    activities.length - completedActivities;

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-textPrimary">
        Analytics
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Time Spent"
          value={`${totalTimeSpent} mins`}
        />
        <StatCard
          title="Completed Activities"
          value={completedActivities}
        />
        <StatCard
          title="Productivity Score"
          value={`${productivityScore}%`}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimePerGoalChart />
        <ActivityStatusChart />
      </div>
      <div className="mt-6">
        <ProductivityTrendChart />
      </div>


      {/* Time per Goal */}
      <div
        className="
          rounded-2xl border border-border
          bg-card p-6
          space-y-4
          shadow-glow
          transition-all duration-300
          hover:border-primary/30
        "
      >
        <h2 className="text-lg font-semibold text-textPrimary">
          Time Spent per Goal
        </h2>

        {goals.map((goal) => {
          const timeForGoal = activities
            .filter((a) => a.goalId === goal.id)
            .reduce((acc, a) => acc + a.spentMinutes, 0);

          return (
            <div
              key={goal.id}
              className="flex justify-between text-sm text-textSecondary border-b border-border/50 last:border-0 py-2"
            >
              <span>{goal.title}</span>
              <span className="font-mono text-primary">{timeForGoal} mins</span>
            </div>
          );
        })}
      </div>

      {/* Activity Breakdown */}
      <div
        className="
          rounded-2xl border border-border
          bg-card p-6
          space-y-4
          shadow-glow
          transition-all duration-300
          hover:border-primary/30
        "
      >
        <h2 className="text-lg font-semibold text-textPrimary">
          Activity Breakdown
        </h2>

        <div className="flex justify-between items-center p-3 rounded-lg bg-surface/50 border border-border">
          <span className="text-sm text-textSecondary">Completed</span>
          <span className="font-bold text-green-500">{completedActivities}</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-surface/50 border border-border">
          <span className="text-sm text-textSecondary">Pending</span>
          <span className="font-bold text-orange-400">{pendingActivities}</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

/* ---------- Reusable Stat Card ---------- */
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div
    className="
      rounded-2xl border border-border
      bg-card p-6
      shadow-glow
      transition-all duration-300
      hover:-translate-y-1
      hover:border-primary/40
    "
  >
    <p className="text-sm font-medium text-textMuted uppercase tracking-wider">{title}</p>
    <h3 className="mt-2 text-3xl font-bold text-textPrimary">
      {value}
    </h3>
  </div>
);


