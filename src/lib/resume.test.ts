import { existsSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { resumeHref } from './resume';

describe('resumeHref', () => {
  it('serves the English résumé only to English readers', () => {
    expect(resumeHref('en')).toBe('/cv/Samuel-Stefano-Resume-EN.pdf');
    expect(resumeHref('en-US')).toBe('/cv/Samuel-Stefano-Resume-EN.pdf');
    expect(resumeHref('pt')).toBe('/cv/Samuel-Stefano-Curriculo-PT.pdf');
    expect(resumeHref('es')).toBe('/cv/Samuel-Stefano-Curriculo-PT.pdf');
    expect(resumeHref(undefined)).toBe('/cv/Samuel-Stefano-Curriculo-PT.pdf');
  });

  it('points at files that exist', () => {
    for (const lang of ['pt', 'en']) {
      expect(existsSync(join(__dirname, '../../public', resumeHref(lang)))).toBe(true);
    }
  });
});
