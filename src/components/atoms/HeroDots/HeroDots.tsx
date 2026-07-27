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
    const client = { x: -9999, y: -9999 };
    const mouse = { x: -9999, y: -9999 };
    let net = readNet();
    let visible = true;
    let raf = 0;

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
        const d2 = dx * dx + dy * dy;
        if (d2 > RADIUS * RADIUS) {
          ctx.beginPath();
          ctx.arc(d.bx, d.by, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.12)`;
          ctx.fill();
          continue;
        }
        const dist = Math.sqrt(d2) || 0.001;
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

    const frame = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      mouse.x = client.x - r.left;
      mouse.y = client.y - r.top;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      draw();
    };

    const schedule = () => {
      if (raf || !visible) return;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      client.x = e.clientX;
      client.y = e.clientY;
      if (glowRef.current) glowRef.current.style.opacity = '1';
      schedule();
    };
    const onLeave = () => {
      client.x = -9999; client.y = -9999;
      if (glowRef.current) glowRef.current.style.opacity = '0';
      schedule();
    };
    const onResize = () => { size(); schedule(); };

    const obs = new MutationObserver(() => { net = readNet(); schedule(); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color', 'class'] });

    size();
    window.addEventListener('resize', onResize);

    if (reduce) {
      draw();
    } else {
      host.addEventListener('mousemove', onMove, { passive: true });
      host.addEventListener('mouseleave', onLeave);
      draw();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(host);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      obs.disconnect();
      io.disconnect();
      window.removeEventListener('resize', onResize);
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
        className="pointer-events-none absolute left-0 top-0 h-[320px] w-[320px] rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle, rgba(var(--net), 0.12), transparent 70%)' }}
      />
    </>
  );
};

export default HeroDots;
