import { describe, expect, it } from 'vitest';
import en from './en.json';
import es from './es.json';
import pt from './pt.json';

type Tree = { [key: string]: unknown };

/** Every leaf (string or list) by its dotted path. */
const leaves = (tree: Tree, prefix = ''): [string, unknown][] =>
  Object.entries(tree).flatMap(([key, value]): [string, unknown][] => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) return leaves(value as Tree, path);
    return [[path, value]];
  });

/** i18next plural suffixes folded, so `x_one`/`x_other` count as `x` (languages pluralise differently). */
const folded = (tree: Tree) => new Set(leaves(tree).map(([path]) => path.replace(/_(zero|one|two|few|many|other)$/, '')));

const placeholders = (text: string) => [...text.matchAll(/{{\s*([\w.]+)\s*}}/g)].map((m) => m[1]).sort();

const kind = (value: unknown) => (Array.isArray(value) ? `list of ${value.length}` : typeof value);

describe('locales', () => {
  const base = folded(pt);
  const ptLeaves = new Map(leaves(pt));

  describe.each([
    ['en', en as Tree],
    ['es', es as Tree],
  ])('%s', (_name, locale) => {
    it('has exactly the same keys as pt', () => {
      const other = folded(locale);
      expect([...base].filter((k) => !other.has(k))).toEqual([]);
      expect([...other].filter((k) => !base.has(k))).toEqual([]);
    });

    it('has the same shape as pt for every key (a string stays a string, a list keeps its length)', () => {
      const mismatched = leaves(locale)
        .filter(([path]) => ptLeaves.has(path))
        .filter(([path, value]) => kind(value) !== kind(ptLeaves.get(path)))
        .map(([path, value]) => `${path}: pt is ${kind(ptLeaves.get(path))}, this is ${kind(value)}`);
      expect(mismatched).toEqual([]);
    });

    it('keeps every {{placeholder}} of pt', () => {
      const broken = leaves(locale)
        .filter(([path, value]) => typeof value === 'string' && typeof ptLeaves.get(path) === 'string')
        .filter(([path, value]) => placeholders(value as string).join() !== placeholders(ptLeaves.get(path) as string).join())
        .map(([path]) => path);
      expect(broken).toEqual([]);
    });
  });

  it('has no empty texts', () => {
    const empty = [pt, en, es].flatMap((locale) =>
      leaves(locale as Tree)
        .filter(([, value]) => (typeof value === 'string' ? value.trim() === '' : Array.isArray(value) && value.length === 0))
        .map(([path]) => path),
    );
    expect(empty).toEqual([]);
  });
});
