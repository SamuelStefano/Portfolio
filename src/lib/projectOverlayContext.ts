import { createContext } from 'react';
import type { Project } from '@/types/project';

export interface ProjectOverlayApi {
  openProject: (project: Project) => void;
}

export const ProjectOverlayContext = createContext<ProjectOverlayApi | null>(null);
