import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProductivity } from "../../context/ProductivityContext";

const COLORS = ["#22c55e", "#3b82f6"];

const ActivityStatusChart = () => {
  const { activities } = useProductivity();

  const completed = activities.filter((a) => a.completed).length;
  const pending = activities.length - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

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
      <h2 className="text-lg font-semibold text-textPrimary mb-6">
        Activity Status
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityStatusChart;
