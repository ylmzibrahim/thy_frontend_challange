/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "640px", // Small screens (e.g., smartphones)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops)
        xl: "1280px", // Extra-large screens (e.g., desktops)
      },
      fontSize: {
        sm: "0.85rem",
        base: "1rem",
        lg: "1.15rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      colors: {
        queryBg: "#063048",
        querySelectionBg: "rgba(96,105,119,0.6)",
        redButton: "#E81932",
        listHeader: "#F9F9F9",
      },
    },
  },
  plugins: [],
};
