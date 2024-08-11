/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-light-blue": "rgb(192, 223, 251)",
        "custom-light-blue-2": "rgb(162, 173, 211)",
        "custom-dark-blue": "rgb(9, 64, 115)",
      },
      fontFamily: {
        roboto: ["Roboto", "Arial", "sans-serif", "Segoe UI Emoji"],
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
  /** check if safelist really needed, colors seemed to "get lost" sporadically */
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [
        "border-green-700",
        "border-red-600",
        "bg-green-700",
        "bg-red-600",
        "bg-gray-500",
        "bg-sky-700",
        "bg-custom-light-blue",
        "bg-custom-light-blue-2",
      ],
    },
  },
};
