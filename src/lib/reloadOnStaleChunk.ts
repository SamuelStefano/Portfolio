const KEY = 'stale-chunk-reload-at';
const MIN_INTERVAL_MS = 60_000;

/**
 * After a deploy, an open tab still references the previous hashed chunk names, which now 404.
 * Vite reports that as `vite:preloadError`; one reload fetches the new index and fixes it.
 * At most one reload a minute, so a chunk that is really unreachable (offline, blocked) cannot
 * put the page in a reload loop: the error then reaches the error boundary instead.
 */
export const reloadOnStaleChunk = () => {
  window.addEventListener('vite:preloadError', (event) => {
    try {
      const last = Number(sessionStorage.getItem(KEY) ?? 0);
      if (Date.now() - last < MIN_INTERVAL_MS) return;
      sessionStorage.setItem(KEY, String(Date.now()));
    } catch {
      return;
    }
    event.preventDefault();
    window.location.reload();
  });
};
