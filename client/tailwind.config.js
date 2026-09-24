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
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c2d7ff',
          300: '#94baff',
          400: '#6093ff',
          500: '#3b6cf6',
          600: '#254edb',
          700: '#1d3cb4',
          800: '#1e3392',
          900: '#1d2e73',
          950: '#111b47',
        },
        slate: {
          850: '#141e33',
          950: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
