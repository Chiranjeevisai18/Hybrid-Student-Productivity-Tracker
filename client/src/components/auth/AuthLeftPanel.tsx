import { motion } from "framer-motion";

const AuthLeftPanel = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-slate-900 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-aiBlue/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg px-10 text-white"
      >
        <h1 className="text-4xl font-bold leading-tight">
          Stay Focused. <br />
          Stay Consistent.
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Plan your goals, track daily activities, and analyze your productivity
          with clarity and structure.
        </p>

        <div className="mt-10 rounded-xl border border-aiBlue/30 bg-slate-800/60 p-6 backdrop-blur">
          <p className="text-sm text-aiBlue font-semibold mb-2">
            AI-Powered Insights
          </p>
          <p className="text-sm text-slate-300">
            Get smart suggestions to improve habits and stay on track.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLeftPanel;
