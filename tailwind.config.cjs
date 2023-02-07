/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        gray: "#374151",
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        main: 'url(@/assets/img/main-bg.webp)',
      },
      gridTemplateColumns: {
        info: '1fr 2fr',
      },
      boxShadow: {
      '3xl': '0px 0px 100px 1px #000000',
      '4xl': '0px 0px 10px 1px #000000',
      },
      gridTemplateRows: {
        auth: 'minmax(450px, 2fr)'
      }
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1200px",
      },
    },
    info: {
      absolute: true,
      content: "",
      width:" 100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)",
    },
    textfill: {
      'white':'-webkit-text-fill-color:white'
    },
    screens: {
      xxl: {max: "1300px"},
      xl: { max: "1200px" },
      lg: { max: "992px" },
      md: { max: "768px" },
      sm: { max: "675px" },
      xs: { max: "576px" },
      xxs: { max: "475px" },
    },
  },
  plugins: [],
};
