/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      clash: ["ClashDisplay-Variable", "sans-serif"],
      cabinet: ["CabinetGrotesk-Variable", "sans-serif"],
      space: ["Space Grotesk", "sans-serif"],
      karla: ["Karla", "sans-serif"],
      melodrama: ["Melodrama-Variable", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
