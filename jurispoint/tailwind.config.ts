import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        navy: {
          50: "#EEF2F8",
          100: "#D7DFEC",
          200: "#AFBFD8",
          300: "#7F96BB",
          400: "#4F6A96",
          500: "#2F4A75",
          600: "#1F365A",
          700: "#162A48",
          800: "#0F1F38",
          900: "#0A172B",
          950: "#060F1D",
        },
        ivory: { DEFAULT: "#FAF7F0", 100: "#F5F0E4", 200: "#EBE3D1" },
        gold: { 300: "#DCC594", 400: "#C9AB6E", 500: "#B38F4D", 600: "#94733A", 700: "#75592C" },
        ink: "#1B2433",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,23,43,0.04), 0 8px 24px -12px rgba(10,23,43,0.12)",
        lift: "0 2px 4px rgba(10,23,43,0.05), 0 22px 44px -18px rgba(10,23,43,0.28)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "none" } },
      },
      animation: { "fade-up": "fade-up 0.7s ease-out both" },
    },
  },
  plugins: [],
};

export default config;
