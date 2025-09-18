import { useState } from 'react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/dialog';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { ExternalLink, Code } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  shortDescription: string;
  collaborators: { name: string; role: string }[];
  stack: string[];
  icon: React.ComponentType<any>;
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
    stack: ['React', 'TypeScript', 'Node.js', 'Judge0 API', 'Supabase'],
    icon: Code,
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
    stack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
    icon: Code,
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
    stack: ['React', 'TypeScript', 'TailwindCSS'],
    icon: Code,
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
    stack: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    icon: Code,
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
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    icon: Code,
    links: [
      { label: 'Ver Código', url: 'https://github.com/SamuelStefano' }
    ],
    category: 'Portfolio'
  }
];

export const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 gradient-text">
            Todos os Projetos
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto">
            Explore todos os meus trabalhos e contribuições
          </Text>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectClick={setSelectedProject}
              isHovered={hoveredProject === project.id}
            />
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
                  {/* Project Icon */}
                  <div className="rounded-lg overflow-hidden bg-card border border-border flex items-center justify-center h-64">
                    <Icon icon={selectedProject.icon} className="w-32 h-32 text-primary" />
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
                      <Heading level={4} className="mb-2">Descrição</Heading>
                      <Text>
                        {selectedProject.description}
                      </Text>
                    </div>
                    
                    <div>
                      <Heading level={4} className="mb-2">Colaboradores</Heading>
                      <div className="space-y-1">
                        {selectedProject.collaborators.map((collaborator, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <Text variant="small">{collaborator.name}</Text>
                            <Badge variant="outline">{collaborator.role}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Heading level={4} className="mb-2">Tecnologias</Heading>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech, index) => (
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
                            <Icon icon={ExternalLink} className="mr-2" />
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
