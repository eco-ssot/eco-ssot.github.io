const colors = require('tailwindcss/colors');

delete colors['lightBlue'];

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    colors,
    extend: {
      colors: {
        primary: colors.teal,
        header: '#30494D',
        panel: '#203033',
        divider: '#707070',
      },
      height: {
        18: '4.5rem',
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
        header: '4rem',
        page: 'calc(100vh - 4rem)',
      },
      padding: {
        18: '4.5rem',
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
