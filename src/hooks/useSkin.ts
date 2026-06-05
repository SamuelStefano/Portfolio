import { useSyncExternalStore } from 'react';

export type Skin = 'modern' | 'cli';

const STORAGE_KEY = 'portfolio-skin';

const read = (): Skin => {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === 'cli' || s === 'modern') return s;
  } catch {
    /* localStorage unavailable (SSR/private mode) */
  }
  return 'modern';
};

let current: Skin = read();
const listeners = new Set<() => void>();

const apply = (skin: Skin) => {
  document.documentElement.setAttribute('data-skin', skin);
};

if (typeof document !== 'undefined') apply(current);

const setSkin = (skin: Skin) => {
  if (skin === current) return;
  current = skin;
  apply(skin);
  try { localStorage.setItem(STORAGE_KEY, skin); } catch { /* ignore */ }
  listeners.forEach(l => l());
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useSkin = () => {
  const skin = useSyncExternalStore(subscribe, () => current, () => 'modern' as Skin);
  const toggle = () => setSkin(skin === 'cli' ? 'modern' : 'cli');
  return { skin, setSkin, toggle };
};
