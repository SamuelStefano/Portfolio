import { useEffect } from 'react';

const CHARS = '01<>/{}[]();=+$#ABCDEF';
const FS = 15;

export const useMatrixRain = (ref: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const readVar = (n: string, fallback: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      return v || fallback;
    };
    let bg = readVar('--cli-rain-bg', '5,8,12');
    let dim = readVar('--cli-rain-dim', '61,220,132');
    let bright = readVar('--cli-rain-bright', '54,226,208');

    const obs = new MutationObserver(() => {
      bg = readVar('--cli-rain-bg', '5,8,12');
      dim = readVar('--cli-rain-dim', '61,220,132');
      bright = readVar('--cli-rain-bright', '54,226,208');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-skin', 'data-color'] });

    let cols = 0;
    let drops: number[] = [];
    const size = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      cols = Math.floor(window.innerWidth / FS);
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    size();
    window.addEventListener('resize', size);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = `rgba(${bg},0.10)`;
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = `${FS}px JetBrains Mono, monospace`;
      for (let x = 0; x < cols; x++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[x] * FS;
        ctx.fillStyle = Math.random() > 0.97 ? `rgba(${bright},0.9)` : `rgba(${dim},0.4)`;
        ctx.fillText(ch, x * FS, y);
        if (y > cv.height && Math.random() > 0.975) drops[x] = 0;
        drops[x] += 0.45;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener('resize', size);
    };
  }, [ref]);
};
