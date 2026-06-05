import { useSyncExternalStore } from 'react';

export type ColorScheme = 'aurora' | 'onchain' | 'emerald' | 'sunset';

export const COLOR_SCHEMES: { id: ColorScheme; dots: [string, string, string] }[] = [
  { id: 'aurora',  dots: ['#48d6ff', '#6f8bff', '#b07cff'] },
  { id: 'onchain', dots: ['#ff4ecd', '#8b5cff', '#36e2ff'] },
  { id: 'emerald', dots: ['#3ee6a0', '#36e2d0', '#a8ff60'] },
  { id: 'sunset',  dots: ['#ff8a4c', '#ff4e6a', '#ffcf5c'] },
];

const STORAGE_KEY = 'portfolio-color';

const read = (): ColorScheme => {
  try {
    const s = localStorage.getItem(STORAGE_KEY) as ColorScheme | null;
    if (s && COLOR_SCHEMES.some(c => c.id === s)) return s;
  } catch {
    /* localStorage unavailable (SSR/private mode) */
  }
  return 'aurora';
};

let current: ColorScheme = read();
const listeners = new Set<() => void>();

const apply = (scheme: ColorScheme) => {
  const html = document.documentElement;
  if (scheme === 'aurora') html.removeAttribute('data-color');
  else html.setAttribute('data-color', scheme);
};

if (typeof document !== 'undefined') apply(current);

const setScheme = (scheme: ColorScheme) => {
  if (scheme === current) return;
  current = scheme;
  apply(scheme);
  try { localStorage.setItem(STORAGE_KEY, scheme); } catch { /* ignore */ }
  listeners.forEach(l => l());
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useColorScheme = () => {
  const scheme = useSyncExternalStore(subscribe, () => current, () => 'aurora' as ColorScheme);
  return { scheme, setScheme };
};
