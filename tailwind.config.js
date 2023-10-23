/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        figtree : ['Figtree', 'sans-serif']
      },
      screens: {
        '3xl': '1500px',
      },
    },
    corePlugins: {
      // ...
      flex: true,
    },
   
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
