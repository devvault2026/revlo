import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api/brave': {
        target: 'https://api.search.brave.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/brave/, ''),
      },
      '/api/deepseek': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deepseek/, ''),
      }
    }
  },
  plugins: [react()],
  build: {
    // Better chunk splitting strategy
    rollupOptions: {
      input: {
        main: 'index.html',
        openclaw: 'openclaw.html',
      },
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('@clerk')) return 'chunk-clerk';
            if (id.includes('framer-motion')) return 'chunk-motion';
            if (id.includes('react-router')) return 'chunk-router';
            if (id.includes('supabase')) return 'chunk-supabase';
            return 'vendors';
          }
          // Page chunks (lazy loaded)
          if (id.includes('/pages/')) {
            const match = id.match(/\/pages\/([^/]+)/);
            if (match) return `page-${match[1]}`;
          }
          // Feature chunks
          if (id.includes('/features/')) {
            const match = id.match(/\/features\/([^/]+)/);
            if (match) return `feature-${match[1]}`;
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@clerk/clerk-react',
      'lucide-react',
      'react-helmet-async',
    ],
  },
});
