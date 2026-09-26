import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadProjectOverlay } from '@/components/organisms/ProjectOverlay/loadProjectOverlay';
import { thumbSrc } from '@/lib/utils';
import type { Project } from '@/types/project';

interface SkillEvidencePanelProps {
  id: string;
  skill: string;
  projects: Project[];
  onSelect: (project: Project) => void;
}

/** Small panel under a skill row listing the projects that use it; opening one shows the project. */
export const SkillEvidencePanel = ({ id, skill, projects, onSelect }: SkillEvidencePanelProps) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    void loadProjectOverlay();
    listRef.current?.querySelector('button')?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      id={id}
      role="group"
      aria-label={`${skill}: ${t('skills.usedIn')}`}
      className="skill-panel absolute inset-x-0 top-full z-30 mt-1.5 rounded-lg border border-primary/30 bg-card p-2 shadow-2xl"
    >
      <p className="px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {t('skills.usedIn')}
      </p>
      <ul ref={listRef} className="max-h-64 space-y-0.5 overflow-y-auto">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="group/ev flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left transition-colors hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:outline-none"
            >
              {project.thumbnail_url ? (
                <img
                  src={thumbSrc(project.thumbnail_url)}
                  onError={(e) => {
                    if (project.thumbnail_url) e.currentTarget.src = project.thumbnail_url;
                  }}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-7 w-11 flex-shrink-0 rounded border border-border object-cover object-top"
                />
              ) : (
                <span className="h-7 w-11 flex-shrink-0 rounded border border-border bg-primary/10" />
              )}
              <span className="min-w-0 flex-1 truncate text-sm text-foreground group-hover/ev:text-primary">
                {project.title}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-transform group-hover/ev:-translate-y-0.5 group-hover/ev:translate-x-0.5 group-hover/ev:text-primary" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillEvidencePanel;
