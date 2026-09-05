import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', short: 'PT', name: 'Português' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'es', short: 'ES', name: 'Español' }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const current = (i18n.language || 'pt').slice(0, 2);

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex h-9 items-center rounded-full border border-border bg-card/70 p-0.5"
    >
      {LANGUAGES.map((language) => {
        const isActive = current === language.code;
        return (
          <button
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            title={language.name}
            aria-label={language.name}
            aria-pressed={isActive}
            className={`h-8 rounded-full px-2 font-mono text-[11px] font-semibold leading-none tracking-wide transition-colors duration-200 sm:px-2.5 sm:text-xs ${
              isActive
                ? 'bg-primary/15 text-primary'
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
