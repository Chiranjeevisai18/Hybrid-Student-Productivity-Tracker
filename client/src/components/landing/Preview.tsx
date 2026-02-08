import { motion } from "framer-motion";

const Preview = () => {
  return (
    <section className="relative bg-background py-28 transition-colors duration-300">
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
            See Your Productivity at a Glance
          </h2>
          <p className="mt-4 text-lg text-textSecondary">
            A clean dashboard that helps you stay focused and consistent.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="flex h-[420px] overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.1)]">

            {/* Sidebar mock */}
            <div className="hidden w-48 flex-col gap-4 border-r border-border bg-cardElevated p-4 md:flex">
              <div className="mb-4 text-sm font-semibold text-primary">
                Dashboard
              </div>
              {["Overview", "Goals", "Activities", "Analytics"].map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-2 text-sm text-textSecondary hover:bg-primary/10 hover:text-primary transition"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Main Content mock */}
            <div className="flex flex-1 flex-col gap-6 p-6 bg-background/50">

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {["Goals", "Tasks", "Completion"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <p className="text-sm text-textMuted">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-textPrimary">
                      —
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="flex flex-1 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-sm text-primary">
                  Productivity Analytics Preview
                </p>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-3xl opacity-60" />
        </motion.div>
      </div>
    </section>
  );
};

export default Preview;
