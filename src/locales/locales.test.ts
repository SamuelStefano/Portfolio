import { describe, expect, it } from 'vitest';
import en from './en.json';
import es from './es.json';
import pt from './pt.json';

type Tree = { [key: string]: unknown };

/** Leaf keys with i18next plural suffixes folded, so `x_one`/`x_other` count as `x`. */
const keys = (tree: Tree, prefix = ''): string[] =>
  Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) return keys(value as Tree, path);
    return [path.replace(/_(one|other|zero|few|many)$/, '')];
  });

const unique = (tree: Tree) => new Set(keys(tree));

describe('locales', () => {
  const base = unique(pt);

  it.each([
    ['en', en],
    ['es', es],
  ])('%s has exactly the same keys as pt', (_name, locale) => {
    const other = unique(locale as Tree);
    expect([...base].filter((k) => !other.has(k))).toEqual([]);
    expect([...other].filter((k) => !base.has(k))).toEqual([]);
  });
});
