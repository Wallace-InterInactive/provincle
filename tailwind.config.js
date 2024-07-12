/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-light-blue": "rgb(192, 223, 251)",
        "custom-dark-blue": "rgb(9, 64, 115)",
      },
    },
  },
  plugins: [],
};
