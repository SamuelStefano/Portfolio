'use client';

import { useEffect, useRef } from 'react';

export const useScrollAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Parar de observar após animar para melhor performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Aguardar um pouco para garantir que o DOM está pronto
    const timeoutId = setTimeout(() => {
      const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-rotate, .animate-fade-in'
      );

      animatedElements.forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return { containerRef };
};