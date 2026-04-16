import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Use refs so state changes never trigger effect re-runs
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const pointer = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const setOpacity = (v: boolean) => {
      dot.style.opacity = v ? '1' : '0';
      ringEl.style.opacity = v ? '1' : '0';
    };

    const setPointerStyle = (p: boolean) => {
      ringEl.style.borderColor = p
        ? 'hsl(var(--neon-purple) / 0.9)'
        : 'hsl(var(--primary) / 0.5)';
      ringEl.style.boxShadow = p
        ? '0 0 12px 2px hsl(var(--neon-purple) / 0.4)'
        : '0 0 8px 1px hsl(var(--primary) / 0.3)';
      ringEl.style.scale = p ? '1.5' : '1';
    };

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (!visible.current) {
        visible.current = true;
        // Snap ring to cursor on first move to avoid sliding from corner
        ring.current = { x: e.clientX, y: e.clientY };
        setOpacity(true);
      }

      const isPointer =
        (e.target as Element)?.closest('a, button, [role="button"], [data-cursor-pointer]') !== null;

      if (isPointer !== pointer.current) {
        pointer.current = isPointer;
        setPointerStyle(isPointer);
      }
    };

    const onMouseLeave = () => { visible.current = false; setOpacity(false); };
    const onMouseEnter = () => { visible.current = true; setOpacity(true); };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      // Dot snaps to cursor
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      // Ring lerps toward cursor
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []); // empty — effect never re-runs

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] w-2 h-2 rounded-full bg-primary"
        style={{
          opacity: 0,
          boxShadow: '0 0 6px 2px hsl(var(--primary) / 0.8)',
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] w-8 h-8 rounded-full border"
        style={{
          opacity: 0,
          borderColor: 'hsl(var(--primary) / 0.5)',
          boxShadow: '0 0 8px 1px hsl(var(--primary) / 0.3)',
          willChange: 'transform',
          transition: 'opacity 0.2s, border-color 0.15s, box-shadow 0.15s, scale 0.15s',
        }}
      />
    </>
  );
};

export default CustomCursor;
