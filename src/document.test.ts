import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8')) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
};

const csp = vercel.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')?.value ?? '';

describe('index.html', () => {
  it('allow-lists every executable inline script in the CSP by hash', () => {
    // JSON-LD and other data blocks are never executed, so the CSP does not apply to them
    const inline = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
      .filter(([, attrs]) => !/\bsrc\s*=/.test(attrs) && !/\btype\s*=\s*["']application\/(ld\+)?json["']/.test(attrs))
      .map(([, , body]) => body);
    expect(inline.length).toBeGreaterThan(0);
    for (const script of inline) {
      const hash = createHash('sha256').update(script).digest('base64');
      expect(csp, 'edit the inline script? update its sha256 in vercel.json').toContain(`'sha256-${hash}'`);
    }
  });

  it('has no inline event handlers (the CSP would block them)', () => {
    expect(html).not.toMatch(/<[^>]+\son[a-z]+\s*=/i);
  });

  it('points social previews at an image that exists', () => {
    const og = html.match(/property="og:image" content="https:\/\/samuelstefano\.dev(\/[^"]+)"/)?.[1];
    expect(og).toBeTruthy();
    expect(() => readFileSync(join(root, 'public', og!))).not.toThrow();
  });
});
