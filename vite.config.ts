import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';
import customPxToVw from '@nillos/vite-plugin-nillos-px2vw';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    customPxToVw({
      targets: [
        {
          fileMatch: /src\/pages\/.*\.mobile.*\.scss/,
          viewportWidth: 375,
          wrapMediaQuery: 'max-width: 992px',
        },
      ],
      unitPrecision: 5,
      minPixelValue: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
  },
});
