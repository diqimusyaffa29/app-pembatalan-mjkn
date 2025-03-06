import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Pastikan path relatif agar build bisa dibuka langsung
  build: {
    outDir: 'dist', // Output folder hasil build
  },
});
