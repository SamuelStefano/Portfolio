import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground/AnimatedBackground';
import { PRODUCTS, productHref, type ProductStatus } from '@/consts/products';
import { cn } from '@/lib/utils';

const DOT: Record<ProductStatus, string> = {
  soon: 'bg-amber-400',
  tuning: 'bg-slate-400',
  early: 'bg-emerald-500',
};

const Produtos = () => {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('products.back')}
        </a>
        <h1 className="mt-6 text-4xl font-black tracking-tight gradient-text sm:text-5xl">{t('products.title')}</h1>
        <p className="mt-3 text-muted-foreground">{t('products.subtitle')}</p>

        <ul className="mt-10 space-y-4">
          {PRODUCTS.map((product) => {
            const href = productHref(product);
            return (
              <li
                key={product.id}
                className="rounded-xl border border-border bg-card/80 p-5 backdrop-blur transition-colors hover:border-primary/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-foreground">{t(`products.items.${product.id}.name`)}</h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/90 px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                    <span className={cn('h-1.5 w-1.5 rounded-full', DOT[product.status])} />
                    {t(`products.status.${product.status}`)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t(`products.items.${product.id}.tagline`)}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {product.hasPrice ? (
                    <span className="font-mono text-sm text-foreground">{t(`products.items.${product.id}.price`)}</span>
                  ) : (
                    <span />
                  )}
                  {href && (
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {t(`products.items.${product.id}.cta`)}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Produtos;
