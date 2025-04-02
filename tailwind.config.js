/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
    "./page/**/*.{js,jsx,ts,tsx}",
    "./component/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'montserrat-bold': "MontserratBold",
        'montserrat-medium': "MontserratMedium",
        'montserrat-regular': "MontserratRegular",
        'montserrat-semibold': "MontserratSemiBold",
        'montserrat-thin': "MontserratThin",
      }
    },
  },
  plugins: [],
}

