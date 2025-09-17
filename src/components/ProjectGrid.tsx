import { useState } from 'react';
import { ExternalLink, Users, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
  shortDescription: string;
  collaborators: { name: string; role: string }[];
  technologies: string[];
  images: string[];
  links: { label: string; url: string }[];
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Skill Evals',
    role: 'Creator',
    shortDescription: 'Plataforma de avaliação de habilidades técnicas com desafios de programação.',
    description: 'Plataforma completa para avaliação de habilidades técnicas com sistema de desafios de programação, compilação em tempo real usando Judge0 API e ranking de desenvolvedores.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Judge0 API', 'Supabase'],
    images: [skillEvalsImg],
    links: [
      { label: 'Ver Projeto', url: '#' },
      { label: 'GitHub', url: 'https://github.com/SamuelStefano' }
    ],
    category: 'Web App'
  },
  {
    id: 2,
    title: 'Codelibrary Landing',
    role: 'Creator',
    shortDescription: 'Landing page moderna para plataforma de código.',
    description: 'Landing page moderna e responsiva para a plataforma Codelibrary, focada em conversão e experiência do usuário com animações fluidas.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    images: [codelibraryLandingImg],
    links: [
      { label: 'Ver Site', url: '#' }
    ],
    category: 'Landing Page'
  },
  {
    id: 3,
    title: 'DevFellowship Website',
    role: 'Collaborator',
    shortDescription: 'Website institucional para comunidade de desenvolvedores.',
    description: 'Website institucional para a DevFellowship, comunidade de desenvolvedores focada em educação e networking profissional.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Collaborator' },
      { name: 'Tainan Fidelis', role: 'Lead Developer' }
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    images: [devfellowshipImg],
    links: [
      { label: 'Ver Site', url: '#' }
    ],
    category: 'Website'
  },
  {
    id: 4,
    title: 'Codelibrary Platform',
    role: 'Collaborator',
    shortDescription: 'Plataforma para compartilhamento de código.',
    description: 'Plataforma colaborativa para compartilhamento de snippets de código, bibliotecas e recursos para desenvolvedores.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Collaborator' },
      { name: 'Equipe DevFellowship', role: 'Team' }
    ],
    technologies: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    images: [codelibraryImg],
    links: [
      { label: 'Ver Plataforma', url: '#' }
    ],
    category: 'Web App'
  },
  {
    id: 5,
    title: 'Portfolio Website',
    role: 'Creator',
    shortDescription: 'Portfólio pessoal moderno e interativo.',
    description: 'Portfólio pessoal moderno e interativo, desenvolvido com as mais recentes tecnologias web e foco em performance.',
    collaborators: [
      { name: 'Samuel Stefano', role: 'Creator' }
    ],
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    images: [portfolioImg],
    links: [
      { label: 'Ver Código', url: 'https://github.com/SamuelStefano' }
    ],
    category: 'Portfolio'
  }
];

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Todos os Projetos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore todos os meus trabalhos e contribuições
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover-glow cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" size="sm" className="hover-glow">
                    <Code className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {project.role}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {project.collaborators.length}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  {project.links.slice(0, 1).map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 hover:bg-primary hover:text-primary-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedProject.category}</Badge>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {selectedProject.role}
                      </Badge>
                    </div>
                    
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

export default ProjectGrid;