import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '@/components/molecules/ProjectCard/ProjectCard';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { ProjectOverlay } from '@/components/organisms/ProjectOverlay/ProjectOverlay';
import { Project } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';

const INITIAL_COUNT = 6;

export const ProjectGrid = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projetos" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-muted/20" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14 animate-fade-up">
          <Heading level={2} className="mb-3 gradient-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            {t('projects.title')}
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground">
            {t('projects.subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, i) => (
            <div key={project.id} className={`h-full [&>*]:h-full ${i < INITIAL_COUNT ? 'animate-fade-up' : ''}`} style={{ animationDelay: `${(i % 3) * 0.1}s` }}>
              <ProjectCard project={project} onProjectClick={setSelectedProject} />
            </div>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {showAll ? t('projects.showLess') : `${t('projects.showMore')} (${projects.length})`}
              {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        )}

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
