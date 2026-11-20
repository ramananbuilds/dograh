import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    proxy: {
      // Anchored so the SPA route `/api-keys` is NOT swallowed by the API proxy.
      // A bare '/api' string prefix-matches '/api-keys' and 500s the whole page.
      '^/api/': {
        target: process.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});

