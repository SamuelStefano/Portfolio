import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const CountUp = ({ value, suffix = '', prefix = '', duration = 1800, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(value, duration, isVisible);
  const { i18n } = useTranslation();
  const formatted = new Intl.NumberFormat((i18n.language || 'pt').slice(0, 2)).format(count);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default CountUp;
