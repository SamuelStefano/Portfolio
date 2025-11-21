import { Code, Database, Server, Globe, Cpu, Brain, Building2, Briefcase, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SkillBar } from '@/components/molecules/SkillBar';
import { ExperienceItem } from '@/components/molecules/ExperienceItem';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

interface TechCategory {
  title: string;
  icon: React.ComponentType<any>;
  skills: { name: string; level: number }[];
  color: string;
}

const getTechCategories = (t: any): TechCategory[] => [
  {
    title: t('skills.frontend'),
    icon: Globe,
    skills: [
      { name: 'React', level: 100 },
      { name: 'TypeScript', level: 100 },
      { name: 'Next.js', level: 100 },
      { name: 'TailwindCSS', level: 100 },
      { name: 'Storybook', level: 90 },
    ],
    color: 'neon-blue'
  },
  {
    title: t('skills.backend'),
    icon: Server,
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'APIs', level: 90 },
      { name: 'JWT', level: 80 },
      { name: 'NestJS', level: 75 },
      { name: 'Web3 Integration', level: 60 },
    ],
    color: 'neon-purple'
  },
  {
    title: t('skills.database'),
    icon: Database,
    skills: [
      { name: 'Supabase', level: 90 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MongoDB', level: 70 },
      { name: 'Prisma', level: 40 },
      { name: 'Firebird', level: 20 }
    ],
    color: 'neon-cyan'
  },
  {
    title: t('skills.tools'),
    icon: Cpu,
    skills: [
      { name: 'Git', level: 100 },
      { name: 'Vercel', level: 100 },
      { name: 'Docker', level: 80 },
      { name: 'Judge0', level: 80 },
      { name: 'WSL', level: 80 },
      { name: 'Linux/Ubuntu', level: 70 },
      { name: 'VPS', level: 60 },
      { name: 'AWS', level: 50 },
    ],
    color: 'accent'
  },
  {
    title: t('skills.softwareEngineering'),
    icon: Brain,
    skills: [
    
      { name: t('skills.documentation'), level: 100 },
      { name: t('skills.testing'), level: 100 },
      { name: t('skills.componentization'), level: 100 },
      { name: t('skills.SOLID'), level: 100 },
      { name: 'CI/CD', level: 100 },
      { name: t('skills.architecture'), level: 90 },
      { name: 'Miro', level: 90 },


    ],
    color: 'neon-green'
  },
  {
    title: t('skills.web3Blockchain'),
    icon: Code,
    skills: [
      { name: 'Base / Scroll', level: 90 },
      { name: 'Viem', level: 40 },
      { name: 'Solidity', level: 20 },
      { name: 'Smart Contracts', level: 20 },
      { name: 'ERC-20 / ERC-721', level: 20 }

    ],
    color: 'neon-purple'
  },
];

const getExperienceData = (t: any) => {
  const translatedData = t('skills.experienceData', { returnObjects: true });
  
  return [
    {
      ...translatedData[0],
      stack: [
        t('skills.technicalSupport'), 
        t('skills.information'), 
        t('skills.networkConfiguration'), 
        t('skills.printerConfiguration'), 
        t('skills.serverConfiguration'), 
        t('skills.computerConfiguration'), 
        t('skills.operatingSystemConfiguration')
      ],
      logo: '/prefeitura.png',
      icon: Building2,
      website: null
    },
    {
      ...translatedData[1],
      stack: ['React', 'TypeScript', 'Node.js', 'NestJS', 'Next.js', 'Supabase', 'Prisma', 'Docker', 'VPS', 'Solidity', 'Web3', 'Judge0', 'TailwindCSS', 'Git'],
      logo: '/DevFelloShip.png',
      icon: Briefcase,
      website: 'https://devfellowship.com'
    },
    {
      ...translatedData[2],
      stack: ['Firebird', 'Delphi', 'APIs', t('skills.fiscalSystems'), t('skills.technicalSupport'), 'Javascript', 'Typescript', 'Nest', 'TailwindCSS', 'Next', t('skills.technicalSupport')],
      logo: '/MMIcon.png',
      icon: Laptop,
      website: 'https://mminfo.me'
    }
  ];
};

const getAdditionalSkills = (t: any): string[] => {
  return t('skills.additionalSkills', { returnObjects: true });
};

export const TechStack = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  
  return (
    <section id="habilidades" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-fade-up">
          <Heading level={2} className="mb-3 sm:mb-4 md:mb-6 gradient-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {t('skills.title')}
          </Heading>
          <Text variant="large" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {t('skills.subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {getTechCategories(t).map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                className="group bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 hover-card animate-fade-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <Heading level={3} className="text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                    {category.title}
                  </Heading>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="animate-slide-left"
                      style={{
                        animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                      }}
                    >
                      <SkillBar
                        name={skill.name}
                        level={skill.level}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center overflow-hidden animate-slide-left">
          <Heading level={3} className="mb-4 sm:mb-5 md:mb-6 from-purple-500 to-blue-700 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg md:text-xl lg:text-2xl">
            {t('skills.otherCompetencies')}
          </Heading>
          <div className="relative">
            <div className="flex animate-scroll gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
              {[...getAdditionalSkills(t), ...getAdditionalSkills(t)].map((skill, index) => (
                <div
                  key={index}
                  className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-card border border-border rounded-full text-xs sm:text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex-shrink-0"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 animate-fade-up">
          <Heading level={3} className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 from-purple-300 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg md:text-xl lg:text-2xl">
            {t('skills.professionalExperience')}
          </Heading>

          <div className="md:flex sm:flex xl:flex 2xl:flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 py-4 sm:py-6 md:py-8 grid md:grid-cols-3">
              <div className="group">
                <img
                  src="/prefeitura.png"
                  alt="Prefeitura"
                  className="w-32 h-32 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 opacity-100 sm:opacity-30 grayscale-0 sm:grayscale transition-all duration-500 lg:group-hover:opacity-100 lg:group-hover:grayscale-0 lg:group-hover:-translate-y-4 lg:group-hover:scale-110 rounded-lg object-cover"
                />
              </div>
              <div className="group">
                <img
                  src="/DevFelloShip.png"
                  alt="Devfellowship"
                  className="w-36 h-36 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-100 sm:opacity-30 grayscale-0 sm:grayscale transition-all duration-500 lg:group-hover:opacity-100 lg:group-hover:grayscale-0 lg:group-hover:-translate-y-4 lg:group-hover:scale-110"
                />
              </div>
              <div className="group">
                <img
                  src="/MMIcon.png"
                  alt="MM Icon"
                  className="w-36 h-24 sm:w-28 sm:h-14 md:w-36 md:h-18 lg:w-44 lg:h-22 xl:w-52 xl:h-28 opacity-100 sm:opacity-30 grayscale-0 sm:grayscale transition-all duration-500 lg:group-hover:opacity-100 lg:group-hover:grayscale-0 lg:group-hover:-translate-y-4 lg:group-hover:scale-110"
                />
              </div>
            </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary" />
              <div className="space-y-12">
                {getExperienceData(t).map((job, index) => (
                  <div
                    key={index}
                    className="relative flex items-start gap-6 animate-slide-right hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-6 relative z-10 animate-pulse-glow" />
                    {job.website ? (
                      <a
                        href={job.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-card border border-border rounded-lg p-6 hover-card cursor-pointer block"
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
                      <div className="flex-1 bg-card border border-border rounded-lg p-6 hover-card">
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
      </div>
    </section>
  );
};

export default TechStack;
