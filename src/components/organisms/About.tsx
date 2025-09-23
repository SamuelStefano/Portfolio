import { User, GraduationCap, MapPin, Globe, Heart, Computer, Clock, Code2, Calendar, GitBranch } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { useExperienceTime } from '@/hooks/useExperienceTime';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { AvailabilityCalendar } from '@/components/molecules/AvailabilityCalendar';

// Stats serão gerados dinamicamente com GitHub API

const highlights = [
  {
    title: 'Paixão por Tecnologia',
    description: 'Sempre em busca de aprender novas tecnologias e aplicar as melhores práticas de desenvolvimento, apaixonado por IA e após me aprimorar 100% no full-stack moderno, irei buscar mais especialização em IA.'
  },
  {
    title: 'Trabalho em Equipe',
    description: 'Experiência colaborando em projetos com outros desenvolvedores, usando metodologias ágeis, reuniões e comprometimento.'
  },
  {
    title: 'Foco na Qualidade',
    description: 'Compromisso com código limpo e escalável, performático, abstraível e que atenda às necessidades dos usuários.'
  },
  {
    title: 'Evolução Constante',
    description: 'Cursando ADS e sempre buscando me especializar em novas tecnologias e frameworks, aprimorando minhas habilidades e conhecimentos.'
  }
];

export const About = () => {
  const experienceTime = useExperienceTime();
  const { addElement } = useScrollAnimations();
  const gitHubStats = useGitHubStats();

  // Stats dinâmicos com dados reais do GitHub
  const stats = [
    { 
      label: 'Tempo de atuação profissional', 
      value: experienceTime.formatted, 
      icon: User 
    },
    { 
      label: 'Repositórios GitHub', 
      value: gitHubStats.isLoading ? '...' : `${gitHubStats.totalRepos}+`, 
      icon: GitBranch 
    },
    { 
      label: 'Tecnologias', 
      value: '15+', 
      icon: Globe 
    },
    { 
      label: 'Linhas de Código', 
      value: gitHubStats.isLoading ? '...' : `${Math.round(gitHubStats.linesOfCode / 1000)}K+`, 
      icon: Code2 
    }
  ];

  return (
    <section id="sobre" className="py-20 px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 gradient-text">
            Sobre Mim
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto ">
            Conheça um pouco mais sobre minha jornada e paixão pela tecnologia
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
            <div className="flex items-center gap-4 mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600">
                <Heading level={3}>
                  Olá! Eu sou o Samuel.
                </Heading>
                <img 
                  src="/Samuel.jpg" 
                  alt="Samuel Stefano" 
                  className="rounded-full border border-primary/20 object-cover w-[160px] h-[160px] mx-10"
                />
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-2xl border border-primary/20 rounded-lg p-4 hover:bg-primary/15 hover-slide-scale">
                <Text>
                  Estou me tornando um Desenvolvedor Full-Stack aos 22 anos, apaixonado por criar soluções digitais 
                  que fazem a diferença. Atualmente cursando o 3º ano de Análise e Desenvolvimento 
                  de Sistemas e sempre em busca de novos desafios.
                </Text>
                <Text>
                  Minha jornada começou com curiosidade sobre como o mundo digital funciona. 
                  Hoje, transformo ideias em realidade usando React, TypeScript, Node.js e outras 
                  tecnologias modernas, sempre buscando me aprimorar e me tornar um profissional melhor.
                </Text>
                <Text>
                  Quando não estou codando, gosto de explorar novas tecnologias, contribuir em 
                  projetos open source e compartilhar conhecimento com a comunidade dev, a que eu mais me encontrei com a Devfellowship.
                </Text>
              </div>
            </div>

            {/* Location & Contact */}
              <div className="flex items-center gap-6 animate-slide-up mx-6" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={MapPin} size="sm" className="text-primary" />
                <Text variant="small">Marialva, PR</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Globe} size="sm" className="text-primary" />
                <Text variant="small">Inglês B2</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Clock} size="sm" className="text-primary" />
                <Text variant="small">6:00 A.M - 18:00 P.M</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Calendar} size="sm" className="text-primary" />
                <Text variant="small">{experienceTime.formatted} de experiência</Text>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 hover-slide-up"
                >
                  <CardContent className="p-4 text-2xl font-bold">
                    <Heading level={4} className="mb-2 from-purple-500 to-blue-700 bg-gradient-to-r bg-clip-text text-transparent">
                      {highlight.title}
                    </Heading>
                    <Text variant="small">
                      {highlight.description}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                return (
                  <Card
                    key={index}
                    className="bg-card border-border hover-glow transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Icon icon={stat.icon} className="text-primary" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <Text variant="small" className="text-muted-foreground">
                        {stat.label}
                      </Text>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Current Focus */}
            <Card className="bg-gradient-card border-border hover-glow animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon icon={GraduationCap} size="sm" className="text-primary" />
                  </div>
                  <Heading level={4}>
                    Foco Atual
                  </Heading>
                </div>
                <Text className="mb-4">
                  Finalizando o curso de ADS e me especializando em arquiteturas 
                  escaláveis e desenvolvimento full-stack moderno.
                </Text>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'Next.js', 'banco de dados', 'Segurança'].map((focus, index) => (
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

            {/* Availability Calendar */}
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <AvailabilityCalendar />
            </div>
            </div>
          </div>

          {/* Company Logos Section */}
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

          {/* Devfellowship Section */}
          <div className="mt-16 w-full">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20 hover-slide-scale">
                <div className="mb-8">
                    <div className="relative">
                      <img src="/DevFelloShip.png" alt="Devfellowship" className="w-28 h-28 absolute left-0 top-0" />
                      <div className="text-center">
                        <Heading level={3} className="mb-4 from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                          🚀 Devfellowship - Minha Jornada na Startup
                        </Heading>
                        <Text className="text-lg max-w-4xl mx-auto leading-relaxed">
                    <span className="text-muted-foreground">A Devfellowship não é apenas uma </span>
                    <span className="text-foreground font-semibold">startup</span>
                    <span className="text-muted-foreground">, é o lugar onde encontrei minha </span>
                    <span className="text-foreground font-semibold">paixão pela programação</span>
                    <span className="text-muted-foreground"> e onde me aprimoro como </span>
                    <span className="text-foreground font-semibold">desenvolvedor e profissional</span>
                    <span className="text-muted-foreground">.</span>
                        </Text>
                      </div>
                    </div>
                </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 border border-primary/20">
                  <Text className="text-foreground font-semibold">
                    A Devfellowship desenvolve <span className="text-muted-foreground">soluções e softwares</span> para grandes empresas. 
                    Especializados em <span className="text-foreground">IA, webapps e arquiteturas escaláveis</span>, 
                    a Devfellowship é uma startup que <span className="text-muted-foreground">transforma ideias em realidade</span>, 
                    caso queira saber mais, clique no botão abaixo.
                  </Text>
                </div>
              </div>
              <br></br>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon icon={Heart} size="sm" className="text-primary" />
                    </div>
                    <Heading level={5} className="text-foreground">Paixão pela Programação</Heading>
                  </div>
                  <Text variant="small" className="text-muted-foreground">
                    Foi na <span className="text-foreground font-semibold">Devfellowship</span> que descobri minha verdadeira 
                    <span className="text-foreground font-semibold"> paixão pela programação</span>. 
                    A comunidade me mostrou que programar vai além de código - é sobre 
                    <span className="text-foreground font-semibold"> resolver problemas reais</span>.
                  </Text>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Icon icon={Globe} size="sm" className="text-accent" />
                    </div>
                    <Heading level={5} className="text-foreground">Aprendizado Contínuo</Heading>
                  </div>
                  <Text variant="small" className="text-muted-foreground">
                    A cada <span className="text-foreground font-semibold">projeto, desafio e mentoria</span>, cresço como desenvolvedor. 
                    A <span className="text-foreground font-semibold">Devfellowship</span> me ensinou que o 
                    <span className="text-foreground font-semibold"> aprendizado nunca para</span> na tecnologia.
                  </Text>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon icon={User} size="sm" className="text-primary" />
                    </div>
                    <Heading level={5} className="text-foreground">Comunidade Acolhedora</Heading>
                  </div>
                  <Text variant="small" className="text-muted-foreground">
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
                      Saiba Mais
                    </a>
                    
                    <a 
                      href="https://apps.devfellowship.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 rounded-lg px-6 py-3 text-accent font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Icon icon={Computer} size="sm" />
                      Projetos
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
