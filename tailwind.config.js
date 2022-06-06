const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const baseSizes = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  13: '3.25rem',
  14: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  64: '16rem',
};

module.exports = {
  content: ['./src/**/*.{js,jsx,json}', './public/**/*.html'],
  theme: {
    colors: { ...colors, transparent: 'transparent', current: 'currentColor' },
    screens: {
      ...defaultTheme.screens,
      sm: { max: '1023px' },
      md: { min: '1024px' },
      lg: { min: '1280px' },
      xl: { min: '1366px' },
      '2xl': { min: '1536px' },
      '1k': { min: '1920px' },
      '2k': { min: '2560px' },
      '4k': { min: '3840px' },
      '5k': { min: '5120px' },
      '8k': { min: '7680px' },
    },
    extend: {
      colors: {
        gray: colors.neutral,
        primary: {
          500: '#21CC97',
          600: '#489C9C',
          700: '#3F7879',
          800: '#30494D',
          900: '#203033',
        },
        dangerous: {
          500: '#FF4E4E',
          700: '#D23B5F',
          900: '#69061E',
        },
        divider: '#707070',
        unit: '#D6D6D6',
        _yellow: '#FACA00',
        _orange: '#FF9300',
        _blue: '#3BAEE5',
      },
      height: {
        '1/2': '50%',
        '1/3': '33.33%',
        '2/3': '66.67%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.67%',
        '2/6': '33.33%',
        '3/6': '50%',
        '4/6': '66.67%',
        '5/6': '83.33%',
      },
      maxHeight: {
        screen: '100vh',
        ...baseSizes,
      },
      maxWidth: {
        screen: '100vw',
        ...baseSizes,
      },
      minHeight: {
        screen: '100vh',
        ...baseSizes,
      },
      minWidth: {
        screen: '100vw',
        ...baseSizes,
      },
      zIndex: {
        1: 1,
        '-1': -1,
        100: 100,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
