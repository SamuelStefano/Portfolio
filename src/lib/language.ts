export const LANGUAGES = ['pt', 'en', 'es'] as const;
export type Language = (typeof LANGUAGES)[number];

export const isLanguage = (value: string): value is Language => (LANGUAGES as readonly string[]).includes(value);

/**
 * The visitor's explicit choice wins, then the browser's language list. Anyone outside
 * pt/en/es reads English — a better default for a recruiter in Berlin than Portuguese.
 */
export const pickLanguage = (stored: string | null, preferred: readonly string[]): Language => {
  for (const candidate of [stored, ...preferred]) {
    const code = candidate?.slice(0, 2).toLowerCase();
    if (code && isLanguage(code)) return code;
  }
  return 'en';
};

/** Value for <html lang>. */
export const htmlLang = (language: string) => (language === 'pt' ? 'pt-BR' : language);
