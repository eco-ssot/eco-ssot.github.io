import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import macrosPlugin from 'vite-plugin-babel-macros';
import dynamicImport from 'vite-plugin-dynamic-import';
import eslint from 'vite-plugin-eslint';

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
  },
});
