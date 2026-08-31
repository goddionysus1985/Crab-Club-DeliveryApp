import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api/poster': {
        target: 'https://joinposter.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/poster/, '/api')
      }
    }
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-confetti': ['canvas-confetti']
        }
      }
    }
  }
});
