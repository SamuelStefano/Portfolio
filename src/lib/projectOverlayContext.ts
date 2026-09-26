import { createContext } from 'react';
import type { Project } from '@/types/project';

export interface ProjectOverlayApi {
  openProject: (project: Project) => void;
  /** True while a project is open; the showcase pauses its autoplay behind the overlay. */
  isOpen: boolean;
}

export const ProjectOverlayContext = createContext<ProjectOverlayApi | null>(null);
