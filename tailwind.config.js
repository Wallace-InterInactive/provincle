/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-light-red": "rgb(248,176,183)",
        "custom-light-green": "rgb(158,234,167)",
        "custom-light-blue": "rgb(192, 223, 251)",
        "custom-light-blue-2": "rgb(162, 173, 211)",
        "custom-dark-blue": "rgb(9, 64, 115)",
        "custom-green-1": "rgb(22,163,74)",
        "custom-green-2": "rgb(34,197,94)", // green-500 and green-700 is also in use
      },
      fontFamily: {
        roboto: ["Roboto", "Arial", "sans-serif", "Segoe UI Emoji"],
      },
      keyframes: {
        "rotate-x": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
        reveal: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
          "85%": { opacity: "0.85" },
          "70%": { opacity: "0.7" },
          "55%": { opacity: "0.55" },
          "40%": { opacity: "0.4" },
          "25%": { opacity: "0.25" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "spin-x": "rotate-x 5s ease-in-out infinite", // Adjust duration as needed
        reveal: "reveal 200ms forwards",
        pop: "pop 500ms ease-out forwards",
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
  /** check if safelist really needed, colors seemed to "get lost" sporadically */
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [
        "border-green-700",
        "border-red-600",
        "border-gray-700",
        "bg-green-700",
        "bg-red-600",
        "bg-red-700",
        "bg-gray-500",
        "bg-sky-700",
        "bg-custom-light-red",
        "bg-custom-light-green",
        "bg-custom-light-blue",
        "bg-custom-light-blue-2",
        "text-green-700",
      ],
    },
  },
};
