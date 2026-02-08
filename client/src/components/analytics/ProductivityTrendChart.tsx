import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProductivity } from "../../context/ProductivityContext";

const ProductivityTrendChart = () => {
  const { activities } = useProductivity();

  // Group by day
  const dailyMap: Record<string, number> = {};

  activities.forEach((a) => {
    if (!a.lastUpdated) return;
    dailyMap[a.lastUpdated] =
      (dailyMap[a.lastUpdated] || 0) + a.spentMinutes;
  });

  const data = Object.entries(dailyMap).map(
    ([date, minutes]) => ({
      date,
      minutes,
    })
  );

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
        Daily Productivity Trend
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityTrendChart;
