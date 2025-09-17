import { User, GraduationCap, MapPin, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
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

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Sobre Mim
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça um pouco mais sobre minha jornada e paixão pela tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Olá! Eu sou o Samuel 👋
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Desenvolvedor Full-Stack de 22 anos, apaixonado por criar soluções digitais 
                  que fazem a diferença. Atualmente cursando o 3º ano de Análise e Desenvolvimento 
                  de Sistemas e sempre em busca de novos desafios.
                </p>
                <p>
                  Minha jornada começou com curiosidade sobre como as coisas funcionam na web. 
                  Hoje, transformo ideias em realidade usando React, TypeScript, Node.js e outras 
                  tecnologias modernas.
                </p>
                <p>
                  Quando não estou codando, gosto de explorar novas tecnologias, contribuir em 
                  projetos open source e compartilhar conhecimento com a comunidade dev.
                </p>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="flex items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Marialva, PR</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4 text-primary" />
                <span>Inglês B2</span>
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
                    <h4 className="font-semibold text-foreground mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="bg-card border-border hover-glow transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
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
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground">
                    Foco Atual
                  </h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Finalizando o curso de ADS e me especializando em arquiteturas 
                  escaláveis e desenvolvimento full-stack moderno.
                </p>
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
                <h4 className="font-bold mb-2">
                  Vamos Trabalhar Juntos?
                </h4>
                <p className="text-sm mb-4 opacity-90">
                  Sempre aberto a novos projetos e oportunidades de colaboração.
                </p>
                <div className="text-sm opacity-80">
                  📧 samuel@example.com
                  <br />
                  📱 +55 (44) 9 9879-5387
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;