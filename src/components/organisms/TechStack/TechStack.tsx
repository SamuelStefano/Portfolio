import { useTranslation } from 'react-i18next';
import { SkillBar } from '@/components/molecules/SkillBar/SkillBar';
import { ExperienceItem } from '@/components/molecules/ExperienceItem/ExperienceItem';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { TECH_CATEGORIES, EXPERIENCE_DATA, ADDITIONAL_SKILLS } from '@/consts/data';

export const TechStack = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();

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
                    {category.title}
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
        </div>

        {/* other competencies scrolling strip */}
        <div className="text-center overflow-hidden mb-16 animate-slide-left">
          <Heading level={3} className="mb-4 from-purple-500 to-blue-700 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg lg:text-xl">
            {t('skills.otherCompetencies')}
          </Heading>
          <div className="relative">
            <div className="flex animate-scroll gap-2 sm:gap-3 whitespace-nowrap">
              {[...ADDITIONAL_SKILLS, ...ADDITIONAL_SKILLS].map((skill, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex-shrink-0"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* professional experience */}
        <div className="animate-fade-up">
          <Heading level={3} className="text-center mb-10 from-purple-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg lg:text-xl">
            {t('skills.professionalExperience')}
          </Heading>

          {/* company logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 py-6 mb-12">
            {[
              { src: '/prefeitura.png',  alt: 'Prefeitura de Marialva', cls: 'w-24 h-24', href: 'https://www.marialva.pr.gov.br' },
              { src: '/DevFelloShip.png',alt: 'DevFellowship',           cls: 'w-28 h-28', href: 'https://devfellowship.com' },
              { src: '/MMIcon.png',      alt: 'M&M Informática',         cls: 'w-32 h-16', href: 'https://mminfo.me' },
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
                        company={job.company}
                        role={job.role}
                        period={job.period}
                        description={job.description}
                        stack={job.stack}
                        icon={job.icon}
                      />
                    </a>
                  ) : (
                    <div className="flex-1 bg-card border border-border rounded-xl p-5 hover-card">
                      <ExperienceItem
                        company={job.company}
                        role={job.role}
                        period={job.period}
                        description={job.description}
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

      </div>
    </section>
  );
};

export default TechStack;
