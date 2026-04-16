import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as Element;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('a, button, [role="button"], [data-cursor-pointer]') !== null
      );
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      // Dot follows cursor exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lerps toward cursor for trailing effect
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] w-2 h-2 rounded-full bg-primary transition-opacity duration-200"
        style={{
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 6px 2px hsl(var(--primary) / 0.8)',
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] w-8 h-8 rounded-full border transition-all duration-150"
        style={{
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer
            ? 'hsl(var(--neon-purple) / 0.9)'
            : 'hsl(var(--primary) / 0.5)',
          boxShadow: isPointer
            ? '0 0 12px 2px hsl(var(--neon-purple) / 0.4)'
            : '0 0 8px 1px hsl(var(--primary) / 0.3)',
          scale: isPointer ? '1.5' : '1',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
