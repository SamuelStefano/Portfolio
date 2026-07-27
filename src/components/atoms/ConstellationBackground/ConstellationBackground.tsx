import { useEffect, useRef } from 'react';

type Pt = { x: number; y: number; vx: number; vy: number; r: number };

const LINK = 130;
const MOUSE_LINK = 170;

const readNet = (): [number, number, number] => {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--net').trim();
  const p = v.split(',').map(n => parseInt(n, 10));
  return p.length === 3 && p.every(n => !isNaN(n)) ? (p as [number, number, number]) : [140, 170, 255];
};

export const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, pts: Pt[] = [];
    const mouse = { x: -999, y: -999 };
    let net = readNet();

    const size = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
      const N = Math.min(110, Math.round((W * H) / 16000));
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // refresh accent color when the color scheme / theme changes
    const obs = new MutationObserver(() => { net = readNet(); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color', 'class'] });

    size();
    window.addEventListener('resize', size, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });

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
        ctx.fillStyle = `rgba(${r},${g},${b},.55)`;
        ctx.fill();
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], c = pts[j];
          const dx = a.x - c.x, dy = a.y - c.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const d = Math.sqrt(d2);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.16 * (1 - d / LINK)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_LINK * MOUSE_LINK) {
          const d = Math.sqrt(d2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.55 * (1 - d / MOUSE_LINK)})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      // draw a single static frame
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
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden />
      <div
        ref={glowRef}
        aria-hidden
        className="fixed left-0 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(var(--net), .10), transparent 70%)' }}
      />
    </>
  );
};

export default ConstellationBackground;
