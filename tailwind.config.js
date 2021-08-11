const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

delete colors['lightBlue'];

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,json}'],
  darkMode: 'media',
  theme: {
    colors: { ...colors, transparent: 'transparent' },
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
        pagePanel: 'calc(100vh - 6rem)',
      },
      padding: {
        18: '4.5rem',
        header: '4rem',
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
        page: 'calc(100vh - 4rem)',
        pagePanel: 'calc(100vh - 6rem)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['DEFAULT'];
      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));

      const utilities = Object.assign({}, ...colorMap);
      addUtilities(utilities, variants('borderColor'));
    }),
  ],
};
