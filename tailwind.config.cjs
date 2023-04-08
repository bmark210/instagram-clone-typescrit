/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: false,
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
    }),
    extend: {
      backdropBlur: {
        '3xl': '3rem',
      },
      backdropOpacity: {
        50: '0.5',
      },
    },
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98',
        primary: '#0095F6',
      },
      black: {
        light: '#262626',
        faded: '#00000059',
        dark: '#000008',
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
        medium: '#8e8e8e',
      },
      red: {
        primary: '#ed4956',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
