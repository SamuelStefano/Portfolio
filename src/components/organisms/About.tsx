import { User, GraduationCap, MapPin, Globe, Heart, Computer, Clock, Code2, Calendar, GitBranch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/atoms/card';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { useExperienceTime } from '@/hooks/useExperienceTime';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { AvailabilityCalendar } from '@/components/molecules/AvailabilityCalendar';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const getHighlights = (t: any) => [
  {
    title: t('about.highlights.passion.title'),
    description: t('about.highlights.passion.description')
  },
  {
    title: t('about.highlights.teamwork.title'),
    description: t('about.highlights.teamwork.description')
  },
  {
    title: t('about.highlights.learning.title'),
    description: t('about.highlights.learning.description')
  },
  {
    title: t('about.highlights.evolution.title'),
    description: t('about.highlights.evolution.description')
  }
];

export const About = () => {
  const { t } = useTranslation();
  const experienceTime = useExperienceTime();
  const gitHubStats = useGitHubStats();
  const { containerRef } = useScrollAnimations();

  const stats = [
    {
      label: t('about.professionalTime'),
      value: experienceTime.formatted,
      icon: User
    },
    {
      label: t('about.projectsCreated'),
      value: gitHubStats.isLoading ? '...' : `${gitHubStats.totalRepos}+`,
      icon: GitBranch
    },
    {
      label: t('about.technologies'),
      value: '15+',
      icon: Globe
    },
    {
      label: t('about.linesOfCode'),
      value: gitHubStats.isLoading ? '...' : `${Math.round(gitHubStats.linesOfCode / 1000)}K+`,
      icon: Code2
    }
  ];

  return (
    <section id="sobre" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-muted/20" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-fade-up">
          <Heading level={2} className="mb-3 sm:mb-4 md:mb-6 gradient-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {t('about.title')}
          </Heading>
          <Text variant="large" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {t('about.subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start xl:items-center">
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600">
                <Heading level={3} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center sm:text-left leading-tight">
                  {t('about.greeting')}
                </Heading>
                <img
                  src="https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/imagem%20profissional.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9pbWFnZW0gcHJvZmlzc2lvbmFsLmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.IobSgu4JA84a7JH4l_SRZxkZZ8qCpS7oQ4PfwhlEut0"
                  alt="Samuel Stefano"
                  className="rounded-full border-2 border-primary/30 object-cover w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44 shadow-lg flex-shrink-0 hover-photo cursor-pointer"
                />
              </div>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl border border-primary/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:bg-primary/5 hover:border-primary/30 lg:hover-slide-scale transition-all duration-300">
                <Text>
                  {t('about.bio1')}
                </Text>
                <Text>
                  {t('about.bio2')}
                </Text>
                <Text>
                  {t('about.bio3')}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-slide-left mx-2 sm:mx-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={MapPin} size="sm" className="text-primary" />
                <Text variant="small" className="text-xs sm:text-sm">{t('about.location')}</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Globe} size="sm" className="text-primary" />
                <Text variant="small" className="text-xs sm:text-sm">{t('about.language')}</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Clock} size="sm" className="text-primary" />
                <Text variant="small" className="text-xs sm:text-sm">{t('about.schedule')}</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Calendar} size="sm" className="text-primary" />
                <Text variant="small" className="text-xs sm:text-sm">{experienceTime.formatted} {t('about.experience')}</Text>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {getHighlights(t).map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-card border border-border hover-card animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <Heading level={4} className="mb-2 sm:mb-3 from-purple-500 to-blue-700 bg-gradient-to-r bg-clip-text text-transparent text-sm sm:text-base md:text-lg font-semibold">
                      {highlight.title}
                    </Heading>
                    <Text variant="small" className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {stats.map((stat, index) => {
                return (
                  <Card
                    key={index}
                    className="bg-card border border-border hover-card animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                      <div className="mb-3 sm:mb-4 flex justify-center">
                        <div className="p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-full">
                          <Icon icon={stat.icon} className="text-primary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </div>
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2">
                        {stat.value}
                      </div>
                      <Text variant="small" className="text-muted-foreground text-xs sm:text-sm md:text-base">
                        {stat.label}
                      </Text>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Card className="bg-gradient-card border-border hover-card animate-slide-right">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon icon={GraduationCap} size="sm" className="text-primary" />
                  </div>
                  <Heading level={4}>
                    {t('about.currentFocus')}
                  </Heading>
                </div>
                <Text className="mb-4">
                  {t('about.currentFocusDescription')}
                </Text>
                <div className="flex flex-wrap gap-2">
                  {(t('about.focusAreas', { returnObjects: true }) as string[]).map((focus: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="animate-fade-up">
              <AvailabilityCalendar />
            </div>
            </div>
          </div>
          <div className="mt-16 w-full">
            <div className="text-center mb-8">
              <Heading level={3} className="mb-4 text-foreground">
                Empresas e Projetos
              </Heading>
              <Text className="text-muted-foreground max-w-2xl mx-auto">
                Algumas das organizações e projetos com os quais tive o prazer de trabalhar
              </Text>
            </div>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 w-full">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-primary/20 lg:hover-slide-scale transition-all duration-300">
                <div className="mb-6 sm:mb-7 md:mb-8">
                    <div className="relative">
                      <img src="/DevFelloShip.png" alt="Devfellowship" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 absolute left-0 top-0" />
                      <div className="text-center pl-14 sm:pl-18 md:pl-22 lg:pl-26 xl:pl-32">
                        <Heading level={3} className="mb-3 sm:mb-4 md:mb-5 from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight">
                          {t('about.devfellowship.journeyTitle')}
                        </Heading>
                        <Text className="text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto leading-relaxed">
                    <span className="text-muted-foreground">{t('about.devfellowship.journeyDescriptionParts.intro')}</span>
                    <span className="text-foreground font-semibold">{t('about.devfellowship.journeyDescriptionParts.startup')}</span>
                    <span className="text-muted-foreground">{t('about.devfellowship.journeyDescriptionParts.middle1')}</span>
                    <span className="text-foreground font-semibold">{t('about.devfellowship.journeyDescriptionParts.passion')}</span>
                    <span className="text-muted-foreground">{t('about.devfellowship.journeyDescriptionParts.middle2')}</span>
                    <span className="text-foreground font-semibold">{t('about.devfellowship.journeyDescriptionParts.professional')}</span>
                    <span className="text-muted-foreground">{t('about.devfellowship.journeyDescriptionParts.end')}</span>
                        </Text>
                      </div>
                    </div>
                </div>
              <div className="text-center mb-4 sm:mb-5 md:mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 border border-primary/20">
                  <Text className="text-foreground font-semibold text-xs sm:text-sm md:text-base text-center">
                    A Devfellowship desenvolve <span className="text-muted-foreground">soluções e softwares</span> para grandes empresas.
                    Especializados em <span className="text-foreground">IA, webapps e arquiteturas escaláveis</span>,
                    a Devfellowship é uma startup que <span className="text-muted-foreground">transforma ideias em realidade</span>,
                    caso queira saber mais, clique no botão abaixo.
                  </Text>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-7 md:mb-8">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon={Heart} size="sm" className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <Heading level={5} className="text-foreground text-sm sm:text-base md:text-lg font-semibold">Paixão pela Programação</Heading>
                  </div>
                  <Text variant="small" className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                    Foi na <span className="text-foreground font-semibold">Devfellowship</span> que descobri minha verdadeira
                    <span className="text-foreground font-semibold"> paixão pela programação</span>.
                    A comunidade me mostrou que programar vai além de código - é sobre
                    <span className="text-foreground font-semibold"> resolver problemas reais</span>.
                  </Text>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-neon-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon={Globe} size="sm" className="text-neon-cyan w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <Heading level={5} className="text-foreground text-sm sm:text-base md:text-lg font-semibold">Aprendizado Contínuo</Heading>
                  </div>
                  <Text variant="small" className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                    A cada <span className="text-foreground font-semibold">projeto, desafio e mentoria</span>, cresço como desenvolvedor.
                    A <span className="text-foreground font-semibold">Devfellowship</span> me ensinou que o
                    <span className="text-foreground font-semibold"> aprendizado nunca para</span> na tecnologia.
                  </Text>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon icon={User} size="sm" className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <Heading level={5} className="text-foreground text-sm sm:text-base md:text-lg font-semibold">Comunidade Acolhedora</Heading>
                  </div>
                  <Text variant="small" className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                    Encontrei na <span className="text-foreground font-semibold">Devfellowship</span> não apenas
                    <span className="text-foreground font-semibold"> conhecimento técnico</span>, mas uma
                    <span className="text-foreground font-semibold"> família de desenvolvedores </span>
                    que sempre me apoia e me inspira a ser melhor.
                  </Text>
                </div>
              </div>
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="https://devfellowship.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg px-6 py-3 text-primary font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Icon icon={Globe} size="sm" />
                      {t('about.devfellowship.learnMore')}
                    </a>

                    <a
                      href="https://apps.devfellowship.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple/30 hover:border-neon-purple/50 rounded-lg px-6 py-3 text-neon-purple font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Icon icon={Computer} size="sm" />
                      {t('about.devfellowship.projects')}
                    </a>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </section>
  );
};

export default About;
