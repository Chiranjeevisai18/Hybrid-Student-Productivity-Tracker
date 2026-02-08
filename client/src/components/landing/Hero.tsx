import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background text-textPrimary transition-colors duration-300">

      {/* background gradient - adapted for themes */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/50 to-background z-0" />

      {/* subtle glow */}
      <div className="absolute right-20 top-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 backdrop-blur-xl bg-background/70 border-b border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary transform hover:scale-105 transition-transform cursor-pointer tracking-tight">
            Student Productivity Tracker
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden md:block group relative overflow-hidden rounded-full border border-transparent px-5 py-2 text-sm font-semibold text-textSecondary transition-all duration-300 hover:border-border hover:bg-card/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5 transition-colors">
                Login
                <svg
                  className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 md:flex-row pt-20">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-xl flex-col gap-6"
        >
          <h1 className="text-4xl font-bold leading-tight md:text-6xl text-textPrimary">
            Build Better
            <span className="block text-primary">Study Habits</span>
          </h1>

          <p className="text-lg text-textSecondary md:text-xl leading-relaxed">
            A smart productivity system for students to plan goals,
            track activities, and improve consistently — powered by insights.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/register"
              className="relative overflow-hidden rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-95 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-border px-8 py-3.5 text-textPrimary transition-all duration-300 hover:border-primary/50 hover:bg-surface hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="flex h-80 w-80 items-center justify-center rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.15)] md:h-96 md:w-96">
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-primary font-medium">
                AI Assisted
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-textPrimary">
                Productivity Dashboard
              </h3>
            </div>
          </div>

          {/* glow ring */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
