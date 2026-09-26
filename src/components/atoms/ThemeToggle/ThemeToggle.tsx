import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const ICON = 'absolute h-4 w-4 text-primary transition-all duration-200 ease-out';

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t('controls.lightMode') : t('controls.darkMode')}
      title={dark ? t('controls.lightMode') : t('controls.darkMode')}
      className="relative w-9 h-9 rounded-full flex items-center justify-center border border-border/60 bg-card/60 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
    >
      <Moon className={cn(ICON, dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-45 scale-50 opacity-0')} />
      <Sun className={cn(ICON, dark ? 'rotate-45 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
    </button>
  );
};

export default ThemeToggle;
