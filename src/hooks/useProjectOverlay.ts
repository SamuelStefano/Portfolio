import { useContext } from 'react';
import { ProjectOverlayContext } from '@/lib/projectOverlayContext';

export const useProjectOverlay = () => {
  const api = useContext(ProjectOverlayContext);
  if (!api) throw new Error('useProjectOverlay must be used inside <ProjectOverlayProvider>');
  return api;
};
