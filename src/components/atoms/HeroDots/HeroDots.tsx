import { useEffect, useRef } from 'react';

type Pt = { x: number; y: number; vx: number; vy: number; r: number };

const readNet = (): [number, number, number] => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--net').trim();
  const p = v.split(',').map((n) => parseInt(n, 10));
  return p.length === 3 && p.every((n) => !isNaN(n)) ? (p as [number, number, number]) : [140, 170, 255];
};

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
    let W = 0, H = 0, pts: Pt[] = [];
    const mouse = { x: -999, y: -999 };
    let net = readNet();

    const size = () => {
      const r = host.getBoundingClientRect();
      W = cv.width = r.width;
      H = cv.height = r.height;
      const N = Math.min(70, Math.round((W * H) / 18000));
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
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
      mouse.x = -999; mouse.y = -999;
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const obs = new MutationObserver(() => { net = readNet(); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color', 'class'] });

    size();
    window.addEventListener('resize', size);
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const tick = () => {
      const [r, g, b] = net;
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(${r},${g},${b},.5)`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], c = pts[j];
          const d = Math.hypot(a.x - c.x, a.y - c.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.14 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < 180) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.5 * (1 - d / 180)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      const [r, g, b] = net;
      for (const p of pts) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(${r},${g},${b},.5)`; ctx.fill();
      }
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
