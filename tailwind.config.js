const colors = require('tailwindcss/colors');

delete colors['lightBlue'];

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,json}', './public/**/*.html'],
  darkMode: 'media',
  theme: {
    colors: { ...colors, transparent: 'transparent' },
    extend: {
      colors: {
        primary: {
          500: '#21CC97',
          600: '#489C9C',
          700: '#3F7879',
          800: '#30494D',
          900: '#203033',
        },
        divider: '#707070',
        unit: '#D6D6D6',
        _yellow: '#FACA00',
        _orange: '#FF9300',
        _blue: '#3BAEE5',
        _red: '#D23B5F',
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
      borderRadius: {
        '1/2': '50%',
      },
      minWidth: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
      },
      minHeight: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
      },
      zIndex: {
        '-1': -1,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
