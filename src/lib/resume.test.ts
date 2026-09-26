import { existsSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { resumeHref } from './resume';

describe('resumeHref', () => {
  it('serves the English résumé only to English readers', () => {
    expect(resumeHref('en')).toBe('/resume-en.pdf');
    expect(resumeHref('en-US')).toBe('/resume-en.pdf');
    expect(resumeHref('pt')).toBe('/curriculo.pdf');
    expect(resumeHref('es')).toBe('/curriculo.pdf');
    expect(resumeHref(undefined)).toBe('/curriculo.pdf');
  });

  it('points at files that exist', () => {
    for (const lang of ['pt', 'en']) {
      expect(existsSync(join(__dirname, '../../public', resumeHref(lang)))).toBe(true);
    }
  });
});
