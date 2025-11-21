import { useTranslation } from 'react-i18next';

const languages = [
  {
    code: 'pt',
    name: 'Português',
    flag: 'https://flagicons.lipis.dev/flags/4x3/br.svg'
  },
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagicons.lipis.dev/flags/4x3/us.svg'
  },
  {
    code: 'es',
    name: 'Español',
    flag: 'https://flagicons.lipis.dev/flags/4x3/es.svg'
  }
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          className={`hover:scale-110 transition-all duration-200 p-1 rounded ${
            i18n.language === language.code
              ? 'grayscale brightness-75 ring-2 ring-primary/50'
              : 'hover:brightness-110'
          }`}
          title={language.name}
        >
          <img
            src={language.flag}
            alt={`${language.name} flag`}
            className="w-6 h-4 object-cover rounded-sm"
          />
        </button>
      ))}
    </div>
  );
};



