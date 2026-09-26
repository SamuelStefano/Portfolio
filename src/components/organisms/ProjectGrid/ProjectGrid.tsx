import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '@/components/molecules/ProjectCard/ProjectCard';
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader';
import { ProjectOverlay } from '@/components/organisms/ProjectOverlay/ProjectOverlay';
import { Project } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';

const INITIAL_COUNT = 6;

export const ProjectGrid = () => {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projetos" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onProjectClick={setSelectedProject} />
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
