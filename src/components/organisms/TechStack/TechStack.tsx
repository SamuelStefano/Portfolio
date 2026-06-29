import { useTranslation } from 'react-i18next';
import { Instagram, Languages, Calendar, MapPin } from 'lucide-react';
import { SkillBar } from '@/components/molecules/SkillBar/SkillBar';
import { ExperienceItem } from '@/components/molecules/ExperienceItem/ExperienceItem';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { TECH_CATEGORIES, EXPERIENCE_DATA, EVENTS_DATA } from '@/consts/data';

const LANGUAGES = [
  { key: 'english', level: 70, inProgress: true },
  { key: 'portuguese', level: 100, inProgress: false },
  { key: 'spanish', level: 80, inProgress: false },
];

export const TechStack = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();

  const additionalSkills = Array.from({ length: 64 }, (_, i) => t(`skills.additionalSkills.${i}`)).filter(
    (s) => !s.startsWith('skills.additionalSkills.')
  );

  return (
    <section id="habilidades" className="py-16 sm:py-20 lg:py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* section header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-up">
          <Heading level={2} className="mb-3 gradient-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            {t('skills.title')}
          </Heading>
          <Text variant="large" className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground">
            {t('skills.subtitle')}
          </Text>
        </div>

        {/* skill categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12 lg:mb-16">
          {TECH_CATEGORIES.map((category, ci) => {
            const IconComponent = category.icon;
            return (
              <div
                key={ci}
                className="group bg-card border border-border rounded-xl p-5 lg:p-6 hover-card animate-fade-up"
                style={{ animationDelay: `${ci * 0.08}s` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <Heading level={3} className="text-base sm:text-lg leading-tight">
                    {t(`skills.categories.${ci}`)}
                  </Heading>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, si) => (
                    <div
                      key={si}
                      className="animate-slide-left"
                      style={{ animationDelay: `${ci * 0.15 + si * 0.08}s` }}
                    >
                      <SkillBar name={skill.name} level={skill.level} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* languages */}
          <div
            className="group bg-card border border-border rounded-xl p-5 lg:p-6 hover-card animate-fade-up"
            style={{ animationDelay: `${TECH_CATEGORIES.length * 0.08}s` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <Heading level={3} className="text-base sm:text-lg leading-tight">
                {t('skills.languagesTitle')}
              </Heading>
            </div>
            <div className="space-y-3">
              {LANGUAGES.map((lang, li) => (
                <div
                  key={lang.key}
                  className="animate-slide-left"
                  style={{ animationDelay: `${0.2 + li * 0.08}s` }}
                >
                  <SkillBar
                    name={t(`skills.languages.${lang.key}`)}
                    level={lang.level}
                    badge={
                      lang.inProgress ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[10px] font-medium leading-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          {t('skills.inProgress')}
                        </span>
                      ) : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* other competencies scrolling strip */}
        <div className="text-center overflow-hidden mb-16 animate-slide-left">
          <Heading level={3} className="mb-4 from-purple-500 to-blue-700 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg lg:text-xl">
            {t('skills.otherCompetencies')}
          </Heading>
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-scroll whitespace-nowrap">
              {[...additionalSkills, ...additionalSkills].map((skill, i) => (
                <div
                  key={i}
                  aria-hidden={i >= additionalSkills.length || undefined}
                  className="mr-2 sm:mr-3 px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex-shrink-0"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* professional experience */}
        <div id="experiencia" className="animate-fade-up scroll-mt-24">
          <Heading level={3} className="text-center mb-10 from-purple-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg lg:text-xl">
            {t('skills.professionalExperience')}
          </Heading>

          {/* company logos */}
          <div id="empresas" className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 py-6 mb-12 scroll-mt-24">
            {[
              { src: '/prefeitura.png',  alt: 'Prefeitura de Marialva', cls: 'w-32 h-32', href: 'https://www.marialva.pr.gov.br' },
              { src: '/DevFelloShip.png',  alt: 'DevFellowship',    cls: 'w-36 h-36', href: 'https://devfellowship.com' },
              { src: '/EducarMais.webp',   alt: 'Instituto Educar+', cls: 'w-40 h-20', href: 'https://institutoeducarmais.org/' },
              { src: '/MMIcon.png',        alt: 'M&M Informática',   cls: 'w-40 h-20', href: 'https://mminfo.me' },
            ].map(logo => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visitar ${logo.alt}`}
                className="group opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:-translate-y-2 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <img src={logo.src} alt={logo.alt} className={`${logo.cls} object-contain`} />
              </a>
            ))}
          </div>

          {/* Instagrams */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6 -mt-6">
            {[
              { href: 'https://www.instagram.com/instituto.educarmais/', handle: 'instituto.educarmais' },
              { href: 'https://www.instagram.com/devfellowship/', handle: 'devfellowship' },
              { href: 'https://www.instagram.com/mm.informatica.marialva/', handle: 'mm.informatica.marialva' },
            ].map(ig => (
              <a
                key={ig.handle}
                href={ig.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${ig.handle}`}
                title={`Instagram ${ig.handle}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 opacity-60 hover:opacity-100"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{ig.handle}</span>
              </a>
            ))}
          </div>

          {/* timeline */}
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            <div className="space-y-10">
              {EXPERIENCE_DATA.map((job, i) => (
                <div
                  key={i}
                  className="relative flex items-start gap-5 animate-slide-right pl-6"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="absolute left-0 top-5 w-3 h-3 bg-primary rounded-full -translate-x-1/2 z-10 animate-pulse-glow" />
                  {job.website ? (
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-card border border-border rounded-xl p-5 hover-card transition-all duration-300 block"
                    >
                      <ExperienceItem
                        company={t(`skills.experienceData.${i}.company`)}
                        role={t(`skills.experienceData.${i}.role`)}
                        period={t(`skills.experienceData.${i}.period`)}
                        description={t(`skills.experienceData.${i}.description`)}
                        stack={job.stack}
                        icon={job.icon}
                      />
                    </a>
                  ) : (
                    <div className="flex-1 bg-card border border-border rounded-xl p-5 hover-card">
                      <ExperienceItem
                        company={t(`skills.experienceData.${i}.company`)}
                        role={t(`skills.experienceData.${i}.role`)}
                        period={t(`skills.experienceData.${i}.period`)}
                        description={t(`skills.experienceData.${i}.description`)}
                        stack={job.stack}
                        icon={job.icon}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* events & community */}
        <div id="eventos" className="mt-16 animate-fade-up scroll-mt-24">
          <Heading level={3} className="text-center mb-3 from-purple-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg lg:text-xl">
            {t('skills.eventsTitle')}
          </Heading>
          <Text className="text-center text-muted-foreground text-sm mb-10 max-w-xl mx-auto">
            {t('skills.eventsSubtitle')}
          </Text>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            <div className="space-y-6">
              {EVENTS_DATA.map((ev, i) => {
                const card = (
                  <div className="flex-1 bg-card border border-border rounded-xl p-4 sm:p-5 hover-card transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Heading level={5} className="text-sm sm:text-base text-foreground">
                        {ev.name}
                      </Heading>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                        {t(`skills.eventTypes.${ev.type}`)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {ev.date}
                      </span>
                      {ev.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {ev.location}
                        </span>
                      )}
                    </div>
                    {ev.ecosystems && ev.ecosystems.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 mr-1">
                          {t('skills.eventEcosystems')}
                        </span>
                        {ev.ecosystems.map((eco) => (
                          <span
                            key={eco}
                            className="px-2 py-0.5 rounded-full bg-muted/50 border border-border text-[11px] font-medium text-foreground"
                          >
                            {eco}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
                return (
                  <div
                    key={ev.name}
                    className="relative flex items-start gap-5 animate-slide-right pl-6"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="absolute left-0 top-5 w-3 h-3 bg-primary rounded-full -translate-x-1/2 z-10 animate-pulse-glow" />
                    {ev.url ? (
                      <a href={ev.url} target="_blank" rel="noopener noreferrer" className="flex-1 block">
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;
