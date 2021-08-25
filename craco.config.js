const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
    ...(process.env.NODE_ENV === 'production' && {
      plugins: [
        new NormalModuleReplacementPlugin(
          /src[\\/]axios[\\/]index.js/,
          path.resolve(__dirname, 'src/axios/index.prod.js')
        ),
        new NormalModuleReplacementPlugin(
          /src[\\/]keycloak[\\/]index.js/,
          path.resolve(__dirname, 'src/keycloak/index.prod.js')
        ),
      ],
    }),
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
