/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
import path from "path";

const PRODUCTION_ORIGIN = "https://samuelstefano.dev";

/**
 * The /api/* routes are Vercel functions and do not run under `vite`. In dev, the read-only
 * stats endpoint is served from a fixture (GITHUB_STATS_FIXTURE=path/to.json) or proxied to
 * production; everything else answers 503 with a hint to use `vercel dev`.
 */
const devApi = (): Plugin => ({
  name: "dev-api",
  configureServer(server) {
    server.middlewares.use("/api", async (req, res) => {
      res.setHeader("Content-Type", "application/json");

      if (req.url?.startsWith("/github-stats")) {
        const fixture = process.env.GITHUB_STATS_FIXTURE;
        try {
          const body = fixture
            ? readFileSync(fixture, "utf8")
            : await fetch(`${PRODUCTION_ORIGIN}/api/github-stats`).then((r) => {
                if (!r.ok) throw new Error(String(r.status));
                return r.text();
              });
          res.statusCode = 200;
          res.end(body);
        } catch {
          res.statusCode = 503;
          res.end(JSON.stringify({ error: "github-stats unavailable in dev" }));
        }
        return;
      }

      res.statusCode = 503;
      res.end(
        JSON.stringify({
          error: "API routes only run on Vercel",
          hint: "Use `npm run dev:vercel` to run them locally.",
        }),
      );
    });
  },
});

/**
 * Vercel answers unknown paths with dist/404.html and a real 404 status. This emits it from the
 * built index.html (same app, same CSP-hashed script) so there is one source of truth; the app
 * renders its 404 page for any path other than "/".
 */
const notFoundPage = (): Plugin => ({
  name: "not-found-page",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const index = bundle["index.html"];
    if (!index || index.type !== "asset") return;
    const html = String(index.source)
      .replace('<meta name="robots" content="index,follow" />', '<meta name="robots" content="noindex" />')
      .replace(/\s*<link rel="canonical"[^>]*>/, "");
    this.emitFile({ type: "asset", fileName: "404.html", source: html });
  },
});

export default defineConfig({
  server: {
    // loopback only: the dev server has no auth and this box is a public VPS
    host: "127.0.0.1",
    port: 8080,
    hmr: {
      overlay: true,
    },
  },
  plugins: [react(), devApi(), notFoundPage()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "api/**/*.test.ts"],
  },
});
