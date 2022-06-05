module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clrDark: "rgb(23, 23, 23)",
        clrMedium: "rgb(68, 68, 68)",
        clrLight: "rgb(237, 237, 237)",
        clrRed: "rgb(218, 0, 55)",
        clrDarkBlue: "hsl(228, 39%, 23%)",
        clrGrayishBlue: "hsl(227, 12%, 61%)",
        clrVeryDarkBlue: "hsl(233, 12%, 13%)",
      },
    },
  },
  plugins: [],
}
