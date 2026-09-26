import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'pt', short: 'PT', name: 'Português' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'es', short: 'ES', name: 'Español' }
];

interface LanguageSelectorProps {
  /** Larger, labelled variant for places where the switch must be noticed */
  prominent?: boolean;
}

export const LanguageSelector = ({ prominent = false }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();

  const current = (i18n.language || 'pt').slice(0, 2);

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-primary/40 bg-card/80 shadow-[0_0_0_3px_hsl(var(--primary)/0.08)] ${
        prominent ? 'h-10 gap-0.5 pl-3 pr-1' : 'h-9 p-0.5'
      }`}
    >
      {prominent && <Globe className="mr-1.5 h-4 w-4 text-primary" aria-hidden />}
      {LANGUAGES.map((language) => {
        const isActive = current === language.code;
        return (
          <button
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            title={language.name}
            aria-label={language.name}
            aria-pressed={isActive}
            className={`rounded-full font-mono font-semibold leading-none tracking-wide transition-colors duration-200 ${
              prominent ? 'h-8 px-3 text-xs sm:text-sm' : 'h-8 px-2 text-[11px] sm:px-2.5 sm:text-xs'
            } ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {language.short}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
