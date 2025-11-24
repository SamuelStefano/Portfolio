import { Project } from '../types/project';

export const getProjectsFromDB = async (): Promise<Project[]> => {
  try {
    const { mockProjects } = await import('./mockProjects');
    return mockProjects;
  } catch (error) {
    console.error('? Erro ao carregar projetos:', error);
  
    const { mockProjects } = await import('./mockProjects');
    return mockProjects;
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const { mockProjects } = await import('./mockProjects');
    return mockProjects.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return null;
  }
};
