import { MapPin, GraduationCap, ArrowRight, FileText, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '@/components/molecules/SocialLink/SocialLink';
import { SOCIAL_LINKS } from '@/consts/components';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { resumeHref } from '@/lib/resume';

const HERO_STACK = ['React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'Claude API', 'MCP', 'Solidity'];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ block: 'start' });

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { containerRef } = useScrollAnimations();

  return (
    <>
      <Navigation />
      <header id="inicio" ref={containerRef} className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 font-medium text-green-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  {t('controls.openToWork')}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Marialva, PR · Brasil
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  ADS · UNINGÁ · 2026
                </span>
              </div>

              <Heading level={1} className="mb-3 text-4xl sm:text-5xl xl:text-6xl tracking-tight">
                <span className="gradient-text">{t('hero.greeting')}</span>
              </Heading>

              <Text className="mb-6 text-xl sm:text-2xl font-semibold text-primary">
                {t('hero.role')}
              </Text>

              <Text className="mb-3 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                {t('hero.bio')}
              </Text>
              <Text className="mb-8 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t('hero.bioContinue')}
              </Text>

              <div className="mb-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollTo('projetos')}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
                >
                  {t('hero.ctaProjects')}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={resumeHref(i18n.language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-105"
                >
                  <FileText className="h-4 w-4" />
                  {t('hero.ctaResume')}
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo('contato')}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  {t('hero.ctaContact')}
                </button>
              </div>
              <Text className="mb-8 text-xs text-muted-foreground/70">{t('hero.resumeNote')}</Text>

              <div className="mb-8 flex flex-wrap gap-2">
                {SOCIAL_LINKS.slice(0, 2).map((link) => (
                  <SocialLink key={link.href} icon={link.icon} href={link.href} label={t(link.labelKey)} size="sm" />
                ))}
              </div>

              <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {HERO_STACK.map((tech) => (
                  <li key={tech} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono transition-colors duration-200 hover:border-primary/50 hover:text-primary">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none animate-scale-in">
              <div className="relative photo-float">
                {/* soft rotating glow behind the photo */}
                <div className="photo-glow pointer-events-none absolute -inset-3 rounded-[28px] opacity-70" aria-hidden />
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
                  <img
                    src="/hero-photo.jpg"
                    alt="Samuel Stefano"
                    width={1092}
                    height={1365}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-green-500/30 bg-card px-3 py-1.5 shadow-lg whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-green-400">{t('controls.openToWork')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
