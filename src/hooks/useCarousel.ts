import { useState, useEffect, useCallback } from 'react';

interface DragHandlers {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

interface UseCarouselResult {
  index: number;
  direction: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  dragHandlers: DragHandlers;
  dragOffset: number;
}

export const useCarousel = (length: number): UseCarouselResult => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % length);
    }, 10000);

    return () => clearInterval(interval);
  }, [index, length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const goTo = useCallback(
    (target: number) => {
      if (target === index || length === 0) return;
      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [index, length],
  );

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setDragOffset(0);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragStart === null) return;
      setDragOffset(e.clientX - dragStart);
    },
    [dragStart],
  );

  const onDragEnd = useCallback(() => {
    if (dragStart === null) return;

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prev();
      } else {
        next();
      }
    }

    setDragStart(null);
    setDragOffset(0);
  }, [dragStart, dragOffset, prev, next]);

  return {
    index,
    direction,
    next,
    prev,
    goTo,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: onDragEnd,
      onMouseLeave: onDragEnd,
    },
    dragOffset,
  };
};
