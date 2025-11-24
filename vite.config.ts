import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
    },
  },
  plugins: [
    react(),
    {
      name: 'api-routes-middleware',
      configureServer(server) {
        server.middlewares.use('/api', (req, res, next) => {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 503;
          res.end(JSON.stringify({
            error: 'API routes are only available in production (Vercel)',
            message: 'To test API routes locally, use: npm run dev:vercel (requires Vercel CLI)',
            note: 'The API routes in /api/* are serverless functions that only work when deployed to Vercel'
          }));
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    force: true,
  },
  build: {
    sourcemap: false,
  },
});
