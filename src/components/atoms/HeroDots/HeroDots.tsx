import { useEffect, useRef } from 'react';

const readNet = (): [number, number, number] => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--net').trim();
  const p = v.split(',').map((n) => parseInt(n, 10));
  return p.length === 3 && p.every((n) => !isNaN(n)) ? (p as [number, number, number]) : [140, 170, 255];
};

const GAP = 30;
const RADIUS = 150;
const EGG_HIT = 32;

interface HeroDotsProps {
  onEgg?: () => void;
}

export const HeroDots = ({ onEgg }: HeroDotsProps) => {
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
    const egg = { x: 0, y: 0 };
    const mouse = { x: -9999, y: -9999 };
    let net = readNet();

    const size = () => {
      const r = host.getBoundingClientRect();
      W = cv.width = r.width;
      H = cv.height = r.height;
      egg.x = GAP * 2.5;
      egg.y = H - GAP * 2.5;
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

      const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 420);
      ctx.beginPath();
      ctx.arc(egg.x, egg.y, 3.4 + pulse * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,184,84,${0.6 + pulse * 0.4})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(egg.x, egg.y, 9 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,184,84,${0.22 + pulse * 0.26})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
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
      const near = Math.hypot(mouse.x - egg.x, mouse.y - egg.y) < EGG_HIT;
      host.style.cursor = near ? 'pointer' : '';
      if (glowRef.current) {
        glowRef.current.style.left = `${mouse.x}px`;
        glowRef.current.style.top = `${mouse.y}px`;
        glowRef.current.style.opacity = '1';
      }
    };
    const onLeave = () => {
      mouse.x = -9999; mouse.y = -9999;
      host.style.cursor = '';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    const onClick = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      if (Math.hypot(cx - egg.x, cy - egg.y) < EGG_HIT) onEgg?.();
    };

    const obs = new MutationObserver(() => { net = readNet(); if (reduce) draw(); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color', 'class'] });

    size();
    window.addEventListener('resize', size);
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    host.addEventListener('click', onClick);

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
      host.removeEventListener('click', onClick);
      host.style.cursor = '';
    };
  }, [onEgg]);

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
