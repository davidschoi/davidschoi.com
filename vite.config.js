import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Custom domain serves from the root, so no base path.
  base: '/',
  build: {
    // The archive is hand-written 2016 markup. Leave it alone — Vite should
    // copy public/ verbatim, never try to resolve its asset references.
    assetsInlineLimit: 4096,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
});
