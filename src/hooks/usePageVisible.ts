import { useEffect, useState } from 'react';

/** False while the tab is in the background, so timers and autoplay can rest. */
export const usePageVisible = () => {
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
};
