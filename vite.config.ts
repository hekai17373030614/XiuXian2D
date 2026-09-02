import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import customPxToVw from '@nillos/vite-plugin-nillos-px2vw';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    // 关闭 svgo，保留手写 SVG 的 id/filter/mask/use 引用关系不被改写
    svgr({ svgrOptions: { svgo: false } }),
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
