import { TerminalSquare, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSkin } from '@/hooks/useSkin';

export const SkinToggle = () => {
  const { t } = useTranslation();
  const { skin, toggle } = useSkin();
  const isCli = skin === 'cli';

  return (
    <button
      onClick={() => { toggle(); window.scrollTo(0, 0); }}
      title={isCli ? t('controls.visualMode') : t('controls.cliMode')}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 to-card/60 px-3 font-mono text-[12.5px] font-semibold text-foreground transition-all duration-200 hover:border-primary/60 hover:shadow-[0_0_18px_hsl(var(--primary)/0.25)]"
    >
      {isCli ? <LayoutDashboard className="h-4 w-4 text-primary" /> : <TerminalSquare className="h-4 w-4 text-primary" />}
      <span className="hidden sm:inline">{isCli ? t('controls.visualMode') : t('controls.cliMode')}</span>
    </button>
  );
};

export default SkinToggle;
