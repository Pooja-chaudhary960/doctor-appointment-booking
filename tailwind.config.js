/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // main HTML file
    "./src/**/*.{js,jsx,ts,tsx}" // all JS/TS files inside src folder and subfolders
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5f6FFF'
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr) )'
      }
    },
  },
  plugins: [],
}
