import { motion } from "framer-motion";
import { FaBullseye, FaTasks, FaChartLine, FaRobot } from "react-icons/fa";

const features = [
  {
    title: "Goal Management",
    description:
      "Define clear academic and personal goals with deadlines and priorities.",
    icon: <FaBullseye size={26} />,
  },
  {
    title: "Activity Tracking",
    description:
      "Break goals into actionable tasks and track daily progress effortlessly.",
    icon: <FaTasks size={26} />,
  },
  {
    title: "Analytics & Insights",
    description:
      "Visualize your productivity trends and understand where time goes.",
    icon: <FaChartLine size={26} />,
  },
  {
    title: "AI Assistance",
    description:
      "Get smart suggestions to improve consistency and productivity habits.",
    icon: <FaRobot size={26} />,
    highlight: true,
  },
];

const Features = () => {
  return (
    <section className="relative bg-surface py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl text-textPrimary">
            Everything You Need to Stay Productive
          </h2>
          <p className="mt-4 text-lg text-textSecondary">
            Designed specifically for students who want structure and clarity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl border p-6 backdrop-blur-md transition-all duration-300 shadow-glow
                ${feature.highlight
                  ? "border-primary/40 bg-cardElevated scale-105"
                  : "border-border bg-card hover:border-primary/40 hover:-translate-y-1"
                }
              `}
            >
              <div
                className={`mb-4 inline-flex items-center justify-center rounded-lg p-3
                  ${feature.highlight
                    ? "bg-aiBlue/20 text-aiBlue"
                    : "bg-primary/10 text-primary"
                  }
                `}
              >
                {feature.icon}
              </div>

              <h3 className="mb-2 text-xl font-semibold text-textPrimary">
                {feature.title}
              </h3>

              <p className="text-sm text-textSecondary">
                {feature.description}
              </p>

              {feature.highlight && (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
                  AI
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
