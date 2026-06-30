import { useReducedMotion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

interface MotionOffset {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
}

export const useMotionPreset = () => {
  const reduced = useReducedMotion();

  const transition = (full: Transition): Transition => (reduced ? { duration: 0 } : full);

  const shift = (full: MotionOffset): MotionOffset => (reduced ? { opacity: full.opacity } : full);

  const slideVariants = (offset: number, scale: number, centerOpacity: number): Variants => ({
    enter: (direction: number) =>
      reduced
        ? { x: 0, opacity: 0, scale: 1 }
        : { x: direction > 0 ? offset : -offset, opacity: 0, scale },
    center: { x: 0, opacity: centerOpacity, scale: 1 },
    exit: (direction: number) =>
      reduced
        ? { x: 0, opacity: 0, scale: 1 }
        : { x: direction < 0 ? offset : -offset, opacity: 0, scale },
  });

  return {
    reduced,
    transition,
    shift,
    cardVariants: slideVariants(300, 0.95, 1),
    sideVariants: slideVariants(50, 0.9, 0.3),
  };
};
