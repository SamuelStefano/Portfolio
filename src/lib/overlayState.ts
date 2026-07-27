const listeners = new Set<(open: boolean) => void>();
let overlayOpen = false;

export const isOverlayOpen = () => overlayOpen;

export const setOverlayOpen = (open: boolean) => {
  if (overlayOpen === open) return;
  overlayOpen = open;
  if (open) document.documentElement.setAttribute('data-overlay-open', '');
  else document.documentElement.removeAttribute('data-overlay-open');
  listeners.forEach(fn => fn(open));
};

export const subscribeOverlay = (fn: (open: boolean) => void) => {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
};
