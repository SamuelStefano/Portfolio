import { useEffect } from 'react';

const PAUSABLE = [
  '.gradient-text',
  '.animate-scroll',
  '.brain-ring',
  '.brain-orbit',
  '.brain-flow',
  '.animate-pulse-glow',
  '.animate-pulse',
  '.cli-cursor',
].join(', ');

const SCAN_DELAYS = [200, 1500, 4000];

export const useOffscreenAnimationPause = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('anim-paused', !entry.isIntersecting);
        }
      },
      { rootMargin: '200px' }
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll(PAUSABLE).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        observer.observe(el);
      });
    };

    const timers = SCAN_DELAYS.map((d) => window.setTimeout(scan, d));

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);
};
