import { User, GraduationCap, MapPin, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

const stats = [
  { label: 'Anos de Idade', value: '22', icon: User },
  { label: 'Projetos Criados', value: '10+', icon: Heart },
  { label: 'Tecnologias', value: '15+', icon: Globe },
  { label: 'Ano ADS', value: '3º', icon: GraduationCap }
];

const highlights = [
  {
    title: 'Paixão por Tecnologia',
    description: 'Sempre em busca de aprender novas tecnologias e aplicar as melhores práticas de desenvolvimento.'
  },
  {
    title: 'Trabalho em Equipe',
    description: 'Experiência colaborando em projetos com outros desenvolvedores, usando metodologias ágeis.'
  },
  {
    title: 'Foco na Qualidade',
    description: 'Compromisso com código limpo, performático e que atenda às necessidades dos usuários.'
  },
  {
    title: 'Evolução Constante',
    description: 'Cursando ADS e sempre buscando me especializar em novas tecnologias e frameworks.'
  }
];

export const About = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 gradient-text">
            Sobre Mim
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto">
            Conheça um pouco mais sobre minha jornada e paixão pela tecnologia
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <Heading level={3} className="mb-4">
                Olá! Eu sou o Samuel 👋
              </Heading>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <Text>
                  Desenvolvedor Full-Stack de 22 anos, apaixonado por criar soluções digitais 
                  que fazem a diferença. Atualmente cursando o 3º ano de Análise e Desenvolvimento 
                  de Sistemas e sempre em busca de novos desafios.
                </Text>
                <Text>
                  Minha jornada começou com curiosidade sobre como as coisas funcionam na web. 
                  Hoje, transformo ideias em realidade usando React, TypeScript, Node.js e outras 
                  tecnologias modernas.
                </Text>
                <Text>
                  Quando não estou codando, gosto de explorar novas tecnologias, contribuir em 
                  projetos open source e compartilhar conhecimento com a comunidade dev.
                </Text>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="flex items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={MapPin} size="sm" className="text-primary" />
                <Text variant="small">Marialva, PR</Text>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon icon={Globe} size="sm" className="text-primary" />
                <Text variant="small">Inglês B2</Text>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <Heading level={4} className="mb-2">
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
                  {['TypeScript', 'Next.js', 'DevOps', 'Cloud'].map((focus, index) => (
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

            {/* Call to Action */}
            <Card className="bg-gradient-primary border-0 text-primary-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-6 text-center">
                <Heading level={4} className="mb-2">
                  Vamos Trabalhar Juntos?
                </Heading>
                <Text variant="small" className="mb-4 opacity-90">
                  Sempre aberto a novos projetos e oportunidades de colaboração.
                </Text>
                <Text variant="small" className="opacity-80">
                  📧 samuel@example.com
                  <br />
                  📱 +55 (44) 9 9879-5387
                </Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
