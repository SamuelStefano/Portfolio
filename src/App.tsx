import { lazy, Suspense } from "react";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));

// Two pages do not need a router: Vercel rewrites every non-file path to index.html,
// so anything other than "/" is the 404.
const isHome = (pathname: string) => pathname === "/" || pathname === "/index.html";

const App = () =>
  isHome(window.location.pathname) ? (
    <Index />
  ) : (
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  );

export default App;
