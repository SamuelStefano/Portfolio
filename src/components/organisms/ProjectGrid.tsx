import { useState } from 'react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { ProjectOverlay } from './ProjectOverlay';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Project } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';

export const ProjectGrid = () => {
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Text variant="large">Carregando projetos...</Text>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Text variant="large" className="text-destructive">Erro ao carregar projetos: {error}</Text>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 gradient-text">
          Explore todos os meus trabalhos e contribuições
          </Heading>
        </div>

        {}
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

        {}
        <ProjectOverlay
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default ProjectGrid;