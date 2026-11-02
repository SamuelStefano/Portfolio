export type ProductStatus = 'soon' | 'tuning' | 'early';

export interface Product {
  /** Key under `products.items.*` in the locales. */
  id: 'sessao' | 'valdez' | 'deck';
  status: ProductStatus;
  hasPrice: boolean;
  /** Only a live product renders its link. */
  live: boolean;
  /** Link target; rendered only when `live` is true. */
  href?: string;
}

export const PRODUCTS: Product[] = [
  { id: 'sessao', status: 'soon', hasPrice: true, live: false, href: 'https://sessao.samuelstefano.dev' },
  { id: 'valdez', status: 'tuning', hasPrice: true, live: false },
  {
    id: 'deck',
    status: 'early',
    hasPrice: false,
    live: true,
    href: 'mailto:samuelstefanodocarmo@gmail.com',
  },
];

/** The href a card may render: none until the product is live. */
export const productHref = (product: Product): string | undefined => (product.live ? product.href : undefined);
