import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjectsFromDB } from '../lib/getProjectsFromDB';
import { supabase } from '../lib/supabaseclient';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Removido: as seções/imagens vêm de getProjectsFromDB (image_categories)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjectsFromDB();
        setProjects(data);
      } catch (err) {
        setError('Erro ao carregar projetos');
        console.error('Erro ao carregar projetos:', err);
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