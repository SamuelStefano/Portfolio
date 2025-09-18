import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Import project images
import skillEvalsImg from '@/assets/skill-evals.jpg';
import codelibraryLandingImg from '@/assets/codelibrary-landing.jpg';
import devfellowshipImg from '@/assets/devfellowship.jpg';
import codelibraryImg from '@/assets/codelibrary.jpg';
import portfolioImg from '@/assets/portfolio.jpg';

interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  fullDescription: string;
  features: string[];
  challenges: string[];
  collaborators: { name: string; role: string }[];
  technologies: string[];
  images: string[];
  links: { label: string; url: string }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Skill Evals',
    role: 'Creator',
    description: 'Plataforma completa para avaliação de habilidades técnicas com sistema de desafios de programação, compilação em tempo real e ranking de desenvolvedores.',
    fullDescription: 'A Skill Evals é uma plataforma inovadora que revoluciona a forma como desenvolvedores são avaliados. Com integração à API Judge0, oferece compilação e execução de código em tempo real, suportando múltiplas linguagens de programação. O sistema inclui desafios progressivos, ranking dinâmico e análise detalhada de performance.',
    features: [
      'Sistema de compilação em tempo real com Judge0 API',
      'Suporte a 40+ linguagens de programação',
      'Ranking dinâmico baseado em performance',
      'Dashboard administrativo completo',
      'Sistema de badges e conquistas',
      'Análise detalhada de código submetido'
    ],
    challenges: [
      'Otimização de performance para compilação simultânea',
      'Implementação de sistema de segurança robusto',
      'Design de interface intuitiva para programadores'
    ],
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Judge0 API', 'Supabase'],
    images: [skillEvalsImg, skillEvalsImg, skillEvalsImg, skillEvalsImg],
    links: [
      { label: 'Ver Projeto', url: '#' },
      { label: 'GitHub', url: 'https://github.com/SamuelStefano' }
    ]
  },
  {
    id: 2,
    title: 'Codelibrary Landing Page',
    role: 'Creator',
    description: 'Landing page moderna e responsiva para a plataforma Codelibrary, focada em conversão e experiência do usuário.',
    fullDescription: 'Uma landing page estrategicamente desenvolvida para maximizar conversões da plataforma Codelibrary. Utilizando as mais modernas técnicas de UX/UI e otimizada para performance, a página apresenta a proposta de valor de forma clara e envolvente.',
    features: [
      'Design responsivo otimizado para conversão',
      'Animações fluidas com Framer Motion',
      'Otimização de SEO e performance',
      'Call-to-actions estrategicamente posicionados',
      'Integração com analytics avançados',
      'Formulários otimizados para captura de leads'
    ],
    challenges: [
      'Otimização de tempo de carregamento',
      'Design que converte em diferentes dispositivos',
      'Integração harmoniosa com a identidade visual'
    ],
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    images: [codelibraryLandingImg, codelibraryLandingImg, codelibraryLandingImg],
    links: [
      { label: 'Ver Site', url: '#' }
    ]
  },
  {
    id: 3,
    title: 'DevFellowship Website',
    role: 'Collaborator',
    description: 'Website institucional para a DevFellowship, comunidade de desenvolvedores focada em educação e networking.',
    fullDescription: 'Website institucional completo para a DevFellowship, uma comunidade vibrante de desenvolvedores brasileiros. O projeto visa conectar profissionais da área, promover educação continuada e facilitar networking entre membros da comunidade tech.',
    features: [
      'Sistema de membros e perfis personalizados',
      'Área de eventos e workshops',
      'Blog integrado para artigos técnicos',
      'Sistema de networking entre desenvolvedores',
      'Dashboard administrativo para gestão',
      'Integração com redes sociais'
    ],
    challenges: [
      'Criação de identidade visual consistente',
      'Implementação de sistema de comunidade escalável',
      'Otimização para SEO e engajamento'
    ],
    collaborators: [
      { name: 'Samuel Stefano', role: 'Collaborator' },
      { name: 'Tainan Fidelis', role: 'Lead Developer' }
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    images: [devfellowshipImg, devfellowshipImg, devfellowshipImg],
    links: [
      { label: 'Ver Site', url: '#' }
    ]
  },
  {
    id: 4,
    title: 'Codelibrary',
    role: 'Collaborator',
    description: 'Plataforma colaborativa para compartilhamento de snippets de código, bibliotecas e recursos para desenvolvedores.',
    fullDescription: 'Plataforma colaborativa robusta que permite desenvolvedores compartilharem snippets de código, bibliotecas úteis e recursos educacionais. Com sistema de categorização avançado e busca inteligente, facilita a descoberta e reutilização de código.',
    features: [
      'Sistema de upload e categorização de snippets',
      'Busca avançada com filtros por linguagem',
      'Sistema de comentários e avaliações',
      'Perfis de desenvolvedores com portfólio',
      'API pública para integração',
      'Sistema de favoritos e coleções'
    ],
    challenges: [
      'Arquitetura de banco de dados escalável',
      'Sistema de busca eficiente para código',
      'Interface intuitiva para desenvolvedores'
    ],
    collaborators: [
      { name: 'Samuel Stefano', role: 'Collaborator' },
      { name: 'Equipe DevFellowship', role: 'Team' }
    ],
    technologies: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    images: [codelibraryImg, codelibraryImg, codelibraryImg],
    links: [
      { label: 'Ver Plataforma', url: '#' }
    ]
  },
  {
    id: 5,
    title: 'Portfolio',
    role: 'Creator',
    description: 'Portfólio pessoal moderno e interativo, desenvolvido com as mais recentes tecnologias web.',
    fullDescription: 'Portfólio pessoal desenvolvido com foco em performance, acessibilidade e experiência do usuário. Apresenta projetos de forma envolvente com animações fluidas e design responsivo, servindo como showcase de habilidades técnicas e criativas.',
    features: [
      'Design responsivo e moderno',
      'Animações fluidas e interativas',
      'Carrossel de projetos automático',
      'Modal detalhado para cada projeto',
      'Seção de habilidades animada',
      'Formulário de contato funcional'
    ],
    challenges: [
      'Otimização de performance com animações',
      'Design que reflete personalidade profissional',
      'Implementação de carrosséis suaves'
    ],
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    images: [portfolioImg, portfolioImg, portfolioImg],
    links: [
      { label: 'Ver Código', url: 'https://github.com/SamuelStefano' }
    ]
  }
];

const ProjectCarousel = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance carousel always
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentProject];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e impactantes
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-8">
            {/* Previous Project (Left) */}
            <div 
              className="w-64 h-48 rounded-xl overflow-hidden opacity-30 cursor-pointer hover:opacity-50 transition-all duration-500 transform hover:scale-105"
              onClick={() => setCurrentProject((currentProject - 1 + projects.length) % projects.length)}
            >
              <img
                src={projects[(currentProject - 1 + projects.length) % projects.length].images[0]}
                alt={projects[(currentProject - 1 + projects.length) % projects.length].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>

            {/* Main Project */}
            <div 
              className="relative w-96 h-64 md:w-[500px] md:h-80 rounded-2xl overflow-hidden group cursor-pointer hover-glow flex-shrink-0 transform transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent transition-all duration-500 group-hover:from-background/90" />
              
              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 group-hover:translate-y-[-4px]">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                    {project.role}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {project.collaborators.length} colaborador{project.collaborators.length > 1 ? 'es' : ''}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
                  <span className="text-xs text-primary font-medium">Clique para ver mais</span>
                </div>
              </div>
            </div>

            {/* Next Project (Right) */}
            <div 
              className="w-64 h-48 rounded-xl overflow-hidden opacity-30 cursor-pointer hover:opacity-50 transition-all duration-500 transform hover:scale-105"
              onClick={() => setCurrentProject((currentProject + 1) % projects.length)}
            >
              <img
                src={projects[(currentProject + 1) % projects.length].images[0]}
                alt={projects[(currentProject + 1) % projects.length].title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
            onClick={prevProject}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
            onClick={nextProject}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => setCurrentProject(index)}
              />
            ))}
          </div>
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-card border-border p-0">
            {selectedProject && (
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold gradient-text mb-2">
                        {selectedProject.title}
                      </h2>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {selectedProject.role}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {selectedProject.links.map((link, index) => (
                        <Button key={index} asChild size="sm" className="hover-glow">
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {link.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Hero Image */}
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={selectedProject.images[0]}
                      alt={selectedProject.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>

                  {/* Overview Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Visão Geral</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </section>

                  {/* Features Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Principais Funcionalidades</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.features?.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Images Gallery */}
                  {selectedProject.images.length > 1 && (
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">Galeria do Projeto</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.images.slice(1).map((image, index) => (
                          <div key={index} className="rounded-lg overflow-hidden">
                            <img
                              src={image}
                              alt={`${selectedProject.title} - Screenshot ${index + 2}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Challenges Section */}
                  {selectedProject.challenges && (
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">Desafios Técnicos</h3>
                      <div className="space-y-3">
                        {selectedProject.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-accent/20 border border-accent/30">
                            <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-accent">{index + 1}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Technologies Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Stack Tecnológica</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </section>

                  {/* Team Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Equipe do Projeto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedProject.collaborators.map((collaborator, index) => (
                        <div key={index} className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{collaborator.name}</span>
                            <Badge variant="outline" className="text-xs">{collaborator.role}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectCarousel;