/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-light-blue": "rgb(192, 223, 251)",
        "custom-dark-blue": "rgb(9, 64, 115)",
      },
      keyframes: {
        "rotate-x": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
      },
      animation: {
        "spin-x": "rotate-x 5s ease-in-out infinite", // Adjust duration as needed
      },
      rotate: {
        90: "90deg",
        180: "180deg",
        270: "270deg",
      },
    },
  },
  variants: {
    extend: {
      rotate: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
