const cracoLess = require('craco-less');
const cracoFastRefresh = require('craco-fast-refresh');

module.exports = {
  plugins: [
    { plugin: cracoFastRefresh },
    {
      plugin: cracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
