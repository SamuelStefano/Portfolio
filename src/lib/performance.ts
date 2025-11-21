
export const performanceConfig = {

  maxConcurrentAnimations: 5,
  

  scrollDebounceMs: 16,

  imageLoadingStrategy: 'lazy' as const,

  useHardwareAcceleration: true,
  reduceMotion: false,
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};


export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const optimizeImage = (src: string, width?: number, quality = 80): string => {

  if (src.includes('supabase.co')) {
    const url = new URL(src);
    if (width) url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', quality.toString());
    url.searchParams.set('format', 'webp');
    return url.toString();
  }
  return src;
};



