/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background-dark': '#111827',
        'border-dark': '#374151',
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
      },
    },
  },
  plugins: [],
}

