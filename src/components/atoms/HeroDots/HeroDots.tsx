import { useEffect, useRef } from 'react';

export const HeroDots = () => {
  const dotsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dots = dotsRef.current;
    const host = dots?.parentElement;
    if (!dots || !host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0, tx = 0, ty = 0;
    const apply = () => {
      dots.style.transform = `translate(${tx * -14}px, ${ty * -14}px)`;
      raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - r.left}px`;
        glowRef.current.style.top = `${e.clientY - r.top}px`;
        glowRef.current.style.opacity = '1';
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    return () => {
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotsRef}
        className="absolute inset-[-24px] bg-[radial-gradient(circle,hsl(var(--muted-foreground)/0.15)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-300 ease-out"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)' }}
      />
    </>
  );
};

export default HeroDots;
