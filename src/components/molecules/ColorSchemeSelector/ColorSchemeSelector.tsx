import { useEffect, useRef, useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useColorScheme, COLOR_SCHEMES, type ColorScheme } from '@/hooks/useColorScheme';

const LABELS: Record<ColorScheme, string> = {
  aurora: 'Aurora',
  onchain: 'Onchain',
  emerald: 'Emerald',
  sunset: 'Sunset',
};

export const ColorSchemeSelector = () => {
  const { t } = useTranslation();
  const { scheme, setScheme } = useColorScheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        aria-label={t('controls.colorScheme')}
        title={t('controls.colorScheme')}
        className="relative w-9 h-9 rounded-full flex items-center justify-center border border-border/60 bg-card/60 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
      >
        <Palette className="w-4 h-4 text-primary" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[182px] rounded-2xl border border-border bg-popover/95 backdrop-blur-md p-2.5 shadow-2xl animate-fade-in animate-in">
          <div className="px-2 pb-1.5 pt-1 text-[10.5px] font-mono uppercase tracking-[1.5px] text-muted-foreground">
            {t('controls.colorScheme')}
          </div>
          {COLOR_SCHEMES.map(({ id, dots }) => (
            <button
              key={id}
              onClick={() => { setScheme(id); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg border px-2.5 py-2 text-left transition-colors ${
                scheme === id ? 'border-border bg-card' : 'border-transparent hover:bg-card/70'
              }`}
            >
              <span className="flex">
                {dots.map((c, i) => (
                  <i
                    key={i}
                    className="block h-4 w-4 rounded-full border-2 border-popover"
                    style={{ background: c, marginLeft: i === 0 ? 0 : -5 }}
                  />
                ))}
              </span>
              <span className="text-[13.5px] font-medium text-foreground">{LABELS[id]}</span>
              {scheme === id && <Check className="ml-auto h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSchemeSelector;
