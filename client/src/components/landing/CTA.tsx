import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative bg-background py-28 transition-colors duration-300">
      {/* glow background - adapted */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <h2 className="text-3xl font-bold md:text-4xl text-textPrimary">
          Start Building Better Habits Today
        </h2>

        <p className="mt-4 text-lg text-textSecondary">
          Turn your goals into consistent actions with clarity, structure,
          and smart insights.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="group relative overflow-hidden rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-border px-8 py-4 text-lg text-textPrimary transition-all duration-300 hover:border-primary/50 hover:bg-surface hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            Login
          </Link>
        </div>
      </motion.div>

      {/* subtle glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl opacity-50" />
    </section>
  );
};

export default CTA;
