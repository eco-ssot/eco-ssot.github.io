import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import macrosPlugin from 'vite-plugin-babel-macros';
import dynamicImport from 'vite-plugin-dynamic-import';
import eslint from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), svgrPlugin(), macrosPlugin(), dynamicImport(), eslint()],
  define: {
    'process.env': process.env,
  },
  server: {
    port: process.env.PORT,
    open: process.env.BROWSER !== 'none',
    cors: false,
    host: true,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      plugins: [visualizer()],
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          zrenderVendor: ['zrender'],
          echartsVendor: ['echarts'],
          lodashVendor: ['lodash'],
          azureVendor: ['@azure/msal-browser', '@azure/msal-react'],
        },
      },
    },
  },
});
