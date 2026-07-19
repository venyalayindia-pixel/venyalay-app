/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#6B1E2B", dark: "#4A121C" },
        gold: { DEFAULT: "#C9962C" },
        amber: { DEFAULT: "#E8A33D" },
        cream: { DEFAULT: "#FAF6EE", deep: "#F1E9D8" },
        charcoal: { DEFAULT: "#231F1E" },
        leaf: { DEFAULT: "#5C6B4A" },
        line: { DEFAULT: "#E4D9C4" },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: { "3xl": "1.75rem" },
    },
  },
  plugins: [],
};
