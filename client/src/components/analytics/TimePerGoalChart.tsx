import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProductivity } from "../../context/ProductivityContext";

const TimePerGoalChart = () => {
  const { goals, activities } = useProductivity();

  const data = goals.map((goal) => ({
    name: goal.title,
    minutes: activities
      .filter((a) => a.goalId === goal.id)
      .reduce((acc, a) => acc + a.spentMinutes, 0),
  }));

  return (
    <div
      className="
        fade-in rounded-2xl border border-border
        bg-card p-6
        shadow-glow
        transition-all duration-300
        hover:border-primary/30
      "
    >
      <h2 className="text-lg font-semibold text-textPrimary mb-4">
        Time Spent per Goal
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar
            dataKey="minutes"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimePerGoalChart;
