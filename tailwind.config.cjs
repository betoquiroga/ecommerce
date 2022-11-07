/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        256: '78rem'
      },
      width: {
        20: '6rem'
      }
    },
  },
  plugins: [],
}
