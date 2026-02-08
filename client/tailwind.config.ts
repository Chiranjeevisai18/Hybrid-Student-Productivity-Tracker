/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        /* ===== Brand ===== */
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
        accent: "#38BDF8", // Keep static for now or add var

        /* ===== Backgrounds ===== */
        background: "var(--background)",
        surface: "var(--surface)",
        card: "var(--card)",
        cardLight: "var(--card)", // Map to card for simplicity

        /* ===== Elevated Card ===== */
        cardElevated: "var(--card-elevated)",

        /* ===== Text ===== */
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        textSubtle: "#64748B", // Static for now

        /* ===== Borders ===== */
        border: "var(--border)",
        borderLight: "var(--border-light)",

        /* ===== Status ===== */
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",

        /* ===== Effects ===== */
        glowPrimary: "rgba(59,130,246,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
