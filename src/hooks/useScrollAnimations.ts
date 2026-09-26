import { useEffect, useRef } from 'react';

const SELECTOR = [
  '.animate-fade-up',
  '.animate-slide-left',
  '.animate-slide-right',
  '.animate-scale-in',
  '.animate-rotate',
  '.animate-fade-in',
].join(', ');

let started = false;

/**
 * One page-wide reveal observer. Elements with a reveal class start hidden (see index.css) and
 * get `data-revealed` when they scroll into view. A MutationObserver also picks up elements
 * that mount later (lazy data, "show more"), which used to stay invisible forever.
 */
const startRevealObserver = () => {
  if (started || typeof window === 'undefined') return;
  started = true;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' },
  );

  const watch = (root: ParentNode) => {
    root.querySelectorAll(SELECTOR).forEach((el) => {
      if (!el.hasAttribute('data-revealed')) io.observe(el);
    });
  };

  watch(document);

  const mo = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches(SELECTOR) && !node.hasAttribute('data-revealed')) io.observe(node);
        watch(node);
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
};

/** Kept as a hook so sections opt in declaratively; the observer itself is shared. */
export const useScrollAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startRevealObserver();
  }, []);

  return { containerRef };
};
