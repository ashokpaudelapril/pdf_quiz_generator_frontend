import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy is useful if your frontend and backend run on different ports
    // and you want to avoid CORS issues during development.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Your FastAPI backend address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite ensures /api is kept
      },
    },
  },
});