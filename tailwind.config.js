/** @type {import('tailwindcss').Config} */

const {
  scrollbarGutter,
  scrollbarWidth,
  scrollbarColor,
} = require("tailwind-scrollbar-utilities");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
      },
      screens: {
        "3xl": "1500px",
      },
    },
    corePlugins: {
      // ...
      flex: true,
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    scrollbarGutter(),
    scrollbarWidth(),
    scrollbarColor(),
  ],
};
