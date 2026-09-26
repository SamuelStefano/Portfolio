import { describe, expect, it } from 'vitest';
import { htmlLang, pickLanguage } from './language';

describe('pickLanguage', () => {
  it('prefers the stored choice over the browser', () => {
    expect(pickLanguage('es', ['pt-BR', 'en'])).toBe('es');
  });

  it('reads regional browser codes', () => {
    expect(pickLanguage(null, ['pt-BR'])).toBe('pt');
    expect(pickLanguage(null, ['es-AR', 'en-US'])).toBe('es');
  });

  it('skips unsupported languages until one fits', () => {
    expect(pickLanguage(null, ['fr-FR', 'de', 'en-GB'])).toBe('en');
  });

  it('falls back to English when nothing fits', () => {
    expect(pickLanguage(null, ['fr-FR', 'ja'])).toBe('en');
    expect(pickLanguage('xx', [])).toBe('en');
  });
});

describe('htmlLang', () => {
  it('uses the Brazilian tag for Portuguese', () => {
    expect(htmlLang('pt')).toBe('pt-BR');
    expect(htmlLang('en')).toBe('en');
  });
});
