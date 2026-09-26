import i18n, { type BackendModule, type ResourceKey } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { htmlLang, isLanguage, LANGUAGES, pickLanguage, type Language } from './language';

const STORAGE_KEY = 'i18nextLng';

// Each locale is its own chunk: a visitor downloads one language, not three.
const loaders: Record<Language, () => Promise<{ default: ResourceKey }>> = {
  pt: () => import('../locales/pt.json'),
  en: () => import('../locales/en.json'),
  es: () => import('../locales/es.json'),
};

const lazyLocales: BackendModule = {
  type: 'backend',
  init: () => {},
  read: (language, _namespace, callback) => {
    if (!isLanguage(language)) {
      callback(new Error(`Unsupported language: ${language}`), false);
      return;
    }
    loaders[language]().then(
      (module) => callback(null, module.default),
      (error: Error) => callback(error, false),
    );
  },
};

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const initial = pickLanguage(readStored(), navigator.languages?.length ? navigator.languages : [navigator.language]);

document.documentElement.lang = htmlLang(initial);

i18n
  .use(lazyLocales)
  .use(initReactI18next)
  .init({
    lng: initial,
    // falling back to the language already loaded costs no extra download
    fallbackLng: initial,
    supportedLngs: LANGUAGES,
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  })
  .then(() => {
    document.title = i18n.t('meta.title');

    // only an explicit switch is remembered; first visits keep following the browser
    i18n.on('languageChanged', (language) => {
      document.documentElement.lang = htmlLang(language);
      document.title = i18n.t('meta.title');
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        /* private mode */
      }
    });

    // warm the other languages once the page is idle so switching never waits on the network
    const warm = () => void i18n.loadLanguages(LANGUAGES.filter((language) => language !== initial));
    if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 5000 });
    else setTimeout(warm, 3000);
  });

export default i18n;
