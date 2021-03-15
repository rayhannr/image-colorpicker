const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        'light-blue': colors.lightBlue
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
