import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { ChunkBoundary } from "./components/atoms/ChunkBoundary/ChunkBoundary";

const NotFound = lazy(() => import("./pages/NotFound"));

// Two pages do not need a router: Vercel answers every unknown path with 404.html (the same
// app, emitted by the notFoundPage plugin in vite.config.ts), so anything other than "/" is the 404.
const isHome = (pathname: string) => pathname === "/" || pathname === "/index.html";

const App = () =>
  isHome(window.location.pathname) ? (
    <Index />
  ) : (
    <ChunkBoundary fallback={<a href="/">samuelstefano.dev</a>}>
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    </ChunkBoundary>
  );

export default App;
