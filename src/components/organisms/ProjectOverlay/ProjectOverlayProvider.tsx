import { lazy, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ChunkBoundary } from '@/components/atoms/ChunkBoundary/ChunkBoundary';
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
  // the last opened project stays set after closing, so the exit animation has something to render
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // bumped on every open and used as the key: a new overlay instance starts on the overview with
  // no lightbox (and a failed chunk gets a fresh boundary); unchanged on close, so the exit
  // animation still plays on the old instance
  const [session, setSession] = useState(0);

  const openProject = useCallback((project: Project) => {
    setSession((n) => n + 1);
    setProjectId(project.id);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const api = useMemo(() => ({ openProject, isOpen }), [openProject, isOpen]);
  const project = projectId ? projects.find((p) => p.id === projectId) ?? null : null;

  // The blurred background blobs re-rasterize every frame; nobody sees them under the overlay.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-overlay-open', isOpen);
  }, [isOpen]);

  return (
    <ProjectOverlayContext.Provider value={api}>
      {children}
      {session > 0 && (
        <ChunkBoundary key={session}>
          <Suspense fallback={null}>
            <ProjectOverlay project={project} isOpen={isOpen && project !== null} onClose={close} />
          </Suspense>
        </ChunkBoundary>
      )}
    </ProjectOverlayContext.Provider>
  );
};

export default ProjectOverlayProvider;
