import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-neon-purple/10" />
      <div className="relative text-center">
        <p className="font-mono text-sm text-muted-foreground">{pathname}</p>
        <h1 className="mt-2 text-7xl font-black tracking-tight gradient-text sm:text-8xl">404</h1>
        <p className="mt-4 text-lg text-foreground">{t('notFound.title')}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t('notFound.description')}</p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('notFound.back')}
        </a>
      </div>
    </main>
  );
};

export default NotFound;
