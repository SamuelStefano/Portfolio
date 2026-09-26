import { useEffect, useState, type RefObject } from 'react';

/**
 * True while the element is at least `threshold` visible. With `once`, it latches on the
 * first sighting (for reveal animations) and stops observing.
 */
export const useInView = (ref: RefObject<Element>, threshold = 0.3, once = false) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return inView;
};
