import { useTranslation } from 'react-i18next';
import { Instagram } from 'lucide-react';
import { ExperienceItem } from '@/components/molecules/ExperienceItem/ExperienceItem';
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader';
import { EXPERIENCE_DATA } from '@/consts/data';

const LOGOS = [
  { src: '/DevFelloShip.png', alt: 'DevFellowship', cls: 'h-14 w-14', href: 'https://devfellowship.com' },
  { src: '/Revera.png', alt: 'Revera', cls: 'h-10 w-28', href: 'https://revera.dev/' },
  { src: '/Itera-wordmark.png', alt: 'Itera', cls: 'h-10 w-24', href: 'https://iterahq.dev/' },
  { src: '/EducarMais.webp', alt: 'Instituto Educar+', cls: 'h-10 w-28', href: 'https://institutoeducarmais.org/' },
  { src: '/MMIcon.png', alt: 'M&M Informática', cls: 'h-10 w-28', href: 'https://mminfo.me' },
  { src: '/prefeitura.png', alt: 'Prefeitura de Marialva', cls: 'h-14 w-14', href: 'https://www.marialva.pr.gov.br' },
];

const INSTAGRAMS = ['devfellowship', 'revera.dev', 'iterahq', 'instituto.educarmais', 'mm.informatica.marialva'];

export const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experiencia" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('experience.title')} />

        <div id="empresas" className="mb-4 flex flex-wrap items-center gap-x-10 gap-y-6">
          {LOGOS.map((logo) => (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              title={logo.alt}
              className="opacity-50 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
            >
              <img src={logo.src} alt={logo.alt} loading="lazy" className={`${logo.cls} object-contain`} />
            </a>
          ))}
        </div>

        <ul className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
          {INSTAGRAMS.map((handle) => (
            <li key={handle}>
              <a
                href={`https://www.instagram.com/${handle}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${handle}`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-3.5 w-3.5" />
                {handle}
              </a>
            </li>
          ))}
        </ul>

        <ol className="relative border-l border-border ml-1.5 space-y-8">
          {EXPERIENCE_DATA.map((job) => {
            const highlights = t(`experience.items.${job.key}.highlights`, { returnObjects: true, defaultValue: [] });
            return (
              <li key={job.key} className="relative pl-6 sm:pl-8">
                <span
                  className={`absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-background ${
                    job.current ? 'bg-primary' : 'bg-muted-foreground/50'
                  }`}
                />
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6 transition-colors duration-200 hover:border-primary/40">
                  <ExperienceItem
                    company={job.company}
                    role={t(`experience.items.${job.key}.role`)}
                    period={t(`experience.items.${job.key}.period`)}
                    description={t(`experience.items.${job.key}.description`)}
                    stack={job.stack}
                    highlights={Array.isArray(highlights) ? (highlights as string[]) : []}
                    icon={job.icon}
                    logo={job.logo}
                    website={job.website}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
