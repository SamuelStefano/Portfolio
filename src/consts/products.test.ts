import { describe, expect, it } from 'vitest';
import { PRODUCTS, productHref } from './products';

describe('PRODUCTS', () => {
  it('renders no link for products that are not live', () => {
    for (const product of PRODUCTS.filter((p) => !p.live)) expect(productHref(product)).toBeUndefined();
  });

  it('gives every live product a link', () => {
    for (const product of PRODUCTS.filter((p) => p.live)) expect(productHref(product)).toBeTruthy();
  });

  it('has unique ids', () => {
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length);
  });
});
