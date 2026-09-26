import { useEffect, useState, type RefObject } from 'react';

/** True while the element is at least `threshold` visible in the viewport. */
export const useInView = (ref: RefObject<Element>, threshold = 0.3) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
};
