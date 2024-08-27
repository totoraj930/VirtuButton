import react from '@vitejs/plugin-react';
import { rmSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-remote', { recursive: true, force: true });
  return {
    publicDir: '../public',
    resolve: {
      alias: {
        '@': path.join(__dirname, './'),
      },
    },
    plugins: [react()],
    root: 'src-remote',
    base: './',
    build: {
      copyPublicDir: true,
      outDir: '../dist-remote',
      rollupOptions: {
        input: 'src-remote/index.html',
      },
    },
  };
});
