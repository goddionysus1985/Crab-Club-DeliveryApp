import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Built-in zero-dependency Poster POS API proxy middleware
function posterProxyPlugin() {
  return {
    name: 'poster-proxy-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url: string = req.url || '';
        if (url.startsWith('/api/poster/')) {
          const posterMethod = url.replace(/^\/api\/poster\//, '');
          const targetUrl = `https://joinposter.com/api/${posterMethod}`;

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', '*');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          try {
            let body: any = undefined;
            if (req.method !== 'GET' && req.method !== 'HEAD') {
              const chunks: any[] = [];
              for await (const chunk of req) {
                chunks.push(chunk);
              }
              body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
            }

            const fetchRes = await fetch(targetUrl, {
              method: req.method,
              headers: {
                'Accept': 'application/json',
                ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
              },
              body
            });

            const data = await fetchRes.text();
            console.log(`[Vite Proxy] 🚀 ${req.method} /${posterMethod.split('?')[0]} -> Status: ${fetchRes.status}`);
            res.statusCode = fetchRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err: any) {
            console.error(`[Vite Proxy Error] ${url}:`, err.message);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), posterProxyPlugin()],
  base: './',
  server: {
    port: 3000,
    host: true
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
