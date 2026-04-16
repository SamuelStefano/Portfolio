import { useEffect, useRef, useState } from 'react';

export const useCountUp = (target: number, duration = 1800, isVisible = false) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current || target === 0) return;
    started.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
};
