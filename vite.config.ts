import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'outputs/assets',
    emptyOutDir: false,
    lib: {
      entry: 'src/main.tsx',
      name: 'JPSteakhouse',
      formats: ['iife'],
      fileName: () => 'app.js',
      cssFileName: 'styles',
    },
    rollupOptions: {
      output: { assetFileNames: (asset) => asset.name?.endsWith('.css') ? 'styles.css' : '[name][extname]' },
    },
  },
});
