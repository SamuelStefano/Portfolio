import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import "./lib/i18n";
import { reloadOnStaleChunk } from "./lib/reloadOnStaleChunk";

reloadOnStaleChunk();

// The first render waits for the visitor's locale chunk; the fallback matches the page background.
createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <App />
    </Suspense>
    <Analytics />
  </>
);
