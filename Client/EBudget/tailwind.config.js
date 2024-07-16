/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Blue: '#18415c',
        Beige: '#FFD3A3'
      },
      boxShadow: {
        'Shadow-green': '2px 2px 20px green',
      }
    },
  },
  plugins: [],
}