import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '@/components/molecules/ProjectCard/ProjectCard';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { FeaturedProjects } from '@/components/organisms/FeaturedProjects/FeaturedProjects';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { useProjectOverlay } from '@/hooks/useProjectOverlay';
import { useProjects } from '@/hooks/useProjects';

const INITIAL_COUNT = 6;

export const ProjectGrid = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  const { projects } = useProjects();
  const { openProject } = useProjectOverlay();
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const visible = showAll ? others : others.slice(0, INITIAL_COUNT);

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

        <div className="animate-fade-up">
          <FeaturedProjects projects={featured} />
        </div>

        {others.length > 0 && (
          <div className="mt-20 lg:mt-24">
            <div className="mb-8 flex items-end justify-between gap-4 animate-fade-up">
              <div>
                <Heading level={3} className="text-xl md:text-2xl font-bold text-foreground">
                  {t('projects.moreTitle')}
                </Heading>
                <Text className="mt-1 text-sm text-muted-foreground">{t('projects.moreSubtitle')}</Text>
              </div>
              <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                {String(others.length).padStart(2, '0')} {t('projects.projectsCount')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((project, i) => (
                <div
                  key={project.id}
                  className="h-full [&>*]:h-full animate-fade-up"
                  style={{ animationDelay: `${(i % 3) * 0.1}s` }}
                >
                  <ProjectCard project={project} onProjectClick={openProject} />
                </div>
              ))}
            </div>

            {others.length > INITIAL_COUNT && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:text-primary"
                >
                  {showAll ? t('projects.showLess') : `${t('projects.showMore')} (${others.length})`}
                  {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
