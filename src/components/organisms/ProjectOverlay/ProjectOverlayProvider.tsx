import { lazy, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ProjectOverlayContext } from '@/lib/projectOverlayContext';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types/project';
import { loadProjectOverlay } from './loadProjectOverlay';

const ProjectOverlay = lazy(loadProjectOverlay);

/** One overlay for the whole page: the showcase, the grid and the skills section all open
 *  projects through `useProjectOverlay()`. The project is kept by id and resolved from the
 *  translated list, so switching language while it is open re-renders the new texts. */
export const ProjectOverlayProvider = ({ children }: { children: ReactNode }) => {
  const { projects } = useProjects();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const openProject = useCallback((project: Project) => {
    setMounted(true);
    setOpenId(project.id);
  }, []);

  const close = useCallback(() => setOpenId(null), []);
  const api = useMemo(() => ({ openProject }), [openProject]);
  const project = openId ? projects.find((p) => p.id === openId) ?? null : null;

  // The blurred background blobs re-rasterize every frame; nobody sees them under the overlay.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-overlay-open', openId !== null);
  }, [openId]);

  return (
    <ProjectOverlayContext.Provider value={api}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <ProjectOverlay project={project} isOpen={project !== null} onClose={close} />
        </Suspense>
      )}
    </ProjectOverlayContext.Provider>
  );
};

export default ProjectOverlayProvider;
