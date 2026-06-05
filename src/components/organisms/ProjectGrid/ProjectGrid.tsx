import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '@/components/molecules/ProjectCard/ProjectCard';
import { ProjectCardSkeleton } from '@/components/molecules/ProjectCardSkeleton/ProjectCardSkeleton';
import { ProjectOverlay } from '@/components/organisms/ProjectOverlay/ProjectOverlay';
import { Heading } from '@/components/atoms/Heading/Heading';
import { ProgressiveLoader } from '@/components/atoms/ProgressiveLoader/ProgressiveLoader';
import { Project } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';

export const ProjectGrid = () => {
  const { t } = useTranslation();
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const { isPhaseLoaded, getPhaseDelay } = useProgressiveLoading();

  if (loading) {
    return (
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4 gradient-text">
              {t('projects.exploreAll')}
            </Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
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
            <Text variant="large" className="text-destructive">{t('projects.hint')}: {error}</Text>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-muted/20">
      <ProgressiveLoader 
        isVisible={isPhaseLoaded('projects')} 
        phase="projects" 
        delay={getPhaseDelay('projects')}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4 gradient-text">
              {t('projects.exploreAll')}
            </Heading>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`h-full [&>*]:h-full ${index > 0 && !showAllMobile ? 'hidden md:block' : ''}`}
            >
              <ProjectCard
                project={project}
                onProjectClick={setSelectedProject}
                isHovered={hoveredProject === project.id}
              />
            </div>
          ))}
        </div>

        {!showAllMobile && projects.length > 1 && (
          <div className="mt-10 flex justify-center md:hidden">
            <button
              onClick={() => setShowAllMobile(true)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {t('projects.showMore')}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        <ProjectOverlay
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
        </div>
      </ProgressiveLoader>
    </section>
  );
};

export default ProjectGrid;


