/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        purple: {
          100: "#d4dcfb",
          200: "#ccccf9",
          300: "#a29fe9",
          600: "#5346df",
        },
      },
    },
  },
  plugins: [],
};
