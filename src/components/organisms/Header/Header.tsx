import { MapPin, GraduationCap, ArrowRight, FileText, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '@/components/molecules/SocialLink/SocialLink';
import { SOCIAL_LINKS } from '@/consts/components';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';

const HERO_STACK = ['React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'Claude API', 'MCP', 'Solidity'];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ block: 'start' });

export const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />
      <header id="inicio" className="relative w-full bg-background pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 font-medium text-green-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {t('controls.openToWork')}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Marialva, PR · Brasil
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  ADS · UNINGÁ
                </span>
              </div>

              <Heading level={1} className="mb-3 text-4xl sm:text-5xl xl:text-6xl tracking-tight text-foreground">
                {t('hero.greeting')}
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

              <div className="mb-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollTo('projetos')}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t('hero.ctaProjects')}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/curriculo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  {t('hero.ctaResume')}
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo('contato')}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {t('hero.ctaContact')}
                </button>
              </div>

              <div className="mb-8 flex flex-wrap gap-2">
                {SOCIAL_LINKS.slice(0, 2).map((link) => (
                  <SocialLink key={link.href} icon={link.icon} href={link.href} label={t(link.labelKey)} size="sm" />
                ))}
              </div>

              <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {HERO_STACK.map((tech) => (
                  <li key={tech} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-border bg-[#0b0b0b] shadow-xl">
                <img
                  src="/imagem profissional.jpg"
                  alt="Samuel Stefano"
                  width={900}
                  height={1167}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
