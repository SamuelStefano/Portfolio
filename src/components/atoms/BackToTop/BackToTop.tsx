import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export const BackToTop = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('controls.backToTop')}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-20 right-5 z-50 w-11 h-11 rounded-full bg-card border border-primary/40 flex items-center justify-center text-primary shadow-lg transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]',
        visible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-90 opacity-0',
      )}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
