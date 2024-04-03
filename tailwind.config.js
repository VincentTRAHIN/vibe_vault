/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        black:
          "0 10px 15px -3px rgba(0, 0, 0, 1), 0 4px 6px -4px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
};
