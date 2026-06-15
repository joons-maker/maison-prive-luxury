import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lux: {
          black:        "#0a0a0a",
          dark:         "#111111",
          card:         "#161616",
          border:       "#2a2a2a",
          gold:         "#c9a96e",
          "gold-light": "#e8c98a",
          "gold-dark":  "#a07840",
          ivory:        "#f5f0e8",
          muted:        "#888880",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "Times New Roman", "serif"],
        sans:  ["Helvetica Neue", "Arial", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in":    "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
