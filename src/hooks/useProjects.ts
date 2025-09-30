import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjectsFromDB } from '../lib/getProjectsFromDB';
import { mockProjects } from '../lib/mockProjects';

let cachedProjects: Project[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const now = Date.now();
        if (cachedProjects && cacheTime && (now - cacheTime < CACHE_DURATION)) {
          setProjects(cachedProjects);
          setLoading(false);
          return;
        }

        const data = await getProjectsFromDB();

        cachedProjects = data;
        cacheTime = now;

        setProjects(data);
      } catch (err) {
        setError('Erro ao carregar projetos');
        console.error('Erro ao carregar projetos:', err);
        
        // Em caso de erro, usa os dados mockados como fallback
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProjectsFromDB();
      setProjects(data);
    } catch (err) {
      setError('Erro ao recarregar projetos');
      console.error('Erro ao recarregar projetos:', err);
      
      // Em caso de erro, usa os dados mockados como fallback
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    refetch
  };
};