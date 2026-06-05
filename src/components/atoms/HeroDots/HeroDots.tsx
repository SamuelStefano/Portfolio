import { useEffect, useRef } from 'react';

const readNet = (): [number, number, number] => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--net').trim();
  const p = v.split(',').map((n) => parseInt(n, 10));
  return p.length === 3 && p.every((n) => !isNaN(n)) ? (p as [number, number, number]) : [140, 170, 255];
};

const GAP = 30;
const RADIUS = 150;

export const HeroDots = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0;
    let dots: { bx: number; by: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let net = readNet();

    const size = () => {
      const r = host.getBoundingClientRect();
      W = cv.width = r.width;
      H = cv.height = r.height;
      dots = [];
      for (let x = GAP / 2; x < W; x += GAP) {
        for (let y = GAP / 2; y < H; y += GAP) {
          dots.push({ bx: x, by: y });
        }
      }
    };

    const draw = () => {
      const [r, g, b] = net;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const inf = Math.max(0, 1 - dist / RADIUS);
        const push = inf * 16;
        const x = d.bx + (dx / dist) * push;
        const y = d.by + (dy / dist) * push;
        const rad = 1.1 + inf * 2.4;
        const alpha = 0.12 + inf * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

    };

    let raf = 0;
    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (glowRef.current) {
        glowRef.current.style.left = `${mouse.x}px`;
        glowRef.current.style.top = `${mouse.y}px`;
        glowRef.current.style.opacity = '1';
      }
    };
    const onLeave = () => {
      mouse.x = -9999; mouse.y = -9999;
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    const obs = new MutationObserver(() => { net = readNet(); if (reduce) draw(); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color', 'class'] });

    size();
    window.addEventListener('resize', size);
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener('resize', size);
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle, rgba(var(--net), 0.12), transparent 70%)' }}
      />
    </>
  );
};

export default HeroDots;
