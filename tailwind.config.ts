import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "rgba(13, 23, 43, 0.72)",
        line: "rgba(148, 163, 184, 0.18)"
      },
      boxShadow: {
        glow: "0 0 36px rgba(34, 211, 238, 0.20)",
        violet: "0 20px 70px rgba(124, 58, 237, 0.30)"
      }
    }
  },
  plugins: []
};

export default config;
