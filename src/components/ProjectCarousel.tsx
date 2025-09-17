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
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Judge0 API', 'Supabase'],
    images: [skillEvalsImg],
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
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    images: [codelibraryLandingImg],
    links: [
      { label: 'Ver Site', url: '#' }
    ]
  },
  {
    id: 3,
    title: 'DevFellowship Website',
    role: 'Collaborator',
    description: 'Website institucional para a DevFellowship, comunidade de desenvolvedores focada em educação e networking.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Collaborator' },
      { name: 'Tainan Fidelis', role: 'Lead Developer' }
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    images: [devfellowshipImg],
    links: [
      { label: 'Ver Site', url: '#' }
    ]
  },
  {
    id: 4,
    title: 'Codelibrary',
    role: 'Collaborator',
    description: 'Plataforma colaborativa para compartilhamento de snippets de código, bibliotecas e recursos para desenvolvedores.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Collaborator' },
      { name: 'Equipe DevFellowship', role: 'Team' }
    ],
    technologies: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    images: [codelibraryImg],
    links: [
      { label: 'Ver Plataforma', url: '#' }
    ]
  },
  {
    id: 5,
    title: 'Portfolio',
    role: 'Creator',
    description: 'Portfólio pessoal moderno e interativo, desenvolvido com as mais recentes tecnologias web.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    images: [portfolioImg],
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
          <div className="flex items-center justify-center gap-4">
            {/* Previous Project (Left) */}
            <div 
              className="w-64 h-48 rounded-xl overflow-hidden opacity-40 cursor-pointer hover:opacity-60 transition-all duration-300"
              onClick={() => setCurrentProject((currentProject - 1 + projects.length) % projects.length)}
            >
              <img
                src={projects[(currentProject - 1 + projects.length) % projects.length].images[0]}
                alt={projects[(currentProject - 1 + projects.length) % projects.length].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Project */}
            <div 
              className="relative w-96 h-64 md:w-[500px] md:h-80 rounded-2xl overflow-hidden group cursor-pointer hover-glow flex-shrink-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {project.role}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {project.collaborators.length} colaborador{project.collaborators.length > 1 ? 'es' : ''}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Next Project (Right) */}
            <div 
              className="w-64 h-48 rounded-xl overflow-hidden opacity-40 cursor-pointer hover:opacity-60 transition-all duration-300"
              onClick={() => setCurrentProject((currentProject + 1) % projects.length)}
            >
              <img
                src={projects[(currentProject + 1) % projects.length].images[0]}
                alt={projects[(currentProject + 1) % projects.length].title}
                className="w-full h-full object-cover"
              />
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-card border-border">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold gradient-text">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Project Image */}
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.images[0]}
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  {/* Project Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Descrição</h4>
                      <p className="text-muted-foreground">
                        {selectedProject.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Colaboradores</h4>
                      <div className="space-y-1">
                        {selectedProject.collaborators.map((collaborator, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-muted-foreground">{collaborator.name}</span>
                            <Badge variant="outline">{collaborator.role}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      {selectedProject.links.map((link, index) => (
                        <Button key={index} asChild className="hover-glow">
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
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectCarousel;