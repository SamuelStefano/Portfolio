import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjectsFromDB } from '../lib/getProjectsFromDB';
import { mockProjects } from '../lib/mockProjects';
import { translateProjectDescriptions } from '../lib/translateProjects';
import { useTranslation } from 'react-i18next';

let cachedRawProjects: Project[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export const useProjects = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar dados do banco (só uma vez)
  useEffect(() => {
    const fetchRawProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const now = Date.now();
        
        // Se já temos dados em cache, não precisa buscar novamente
        if (cachedRawProjects && cacheTime && (now - cacheTime < CACHE_DURATION)) {
          const translatedData = translateProjectDescriptions(cachedRawProjects, t);
          setProjects(translatedData);
          setLoading(false);
          return;
        }

        // Se o Supabase não estiver configurado, usa dados mockados diretamente
        const { isSupabaseConfigured } = await import('../lib/supabaseclient');
        if (!isSupabaseConfigured()) {
          console.log('?? Usando dados mockados (Supabase não configurado)');
          cachedRawProjects = mockProjects;
          const translatedMockProjects = translateProjectDescriptions(mockProjects, t);
          setProjects(translatedMockProjects);
          setLoading(false);
          return;
        }

        const data = await getProjectsFromDB();
        cachedRawProjects = data;
        cacheTime = now;

        const translatedData = translateProjectDescriptions(data, t);
        setProjects(translatedData);
      } catch (err) {
        setError('Erro ao carregar projetos');
        console.error('Erro ao carregar projetos:', err);
        
        // Em caso de erro, usa os dados mockados como fallback
        cachedRawProjects = mockProjects;
        const translatedMockProjects = translateProjectDescriptions(mockProjects, t);
        setProjects(translatedMockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchRawProjects();
  }, []); // Só executa uma vez

  // Efeito separado para traduzir quando o idioma muda
  useEffect(() => {
    if (cachedRawProjects) {
      const translatedData = translateProjectDescriptions(cachedRawProjects, t);
      setProjects(translatedData);
    }
  }, [t, i18n.language]); // Só traduz, não busca do banco

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProjectsFromDB();
      const translatedData = translateProjectDescriptions(data, t);
      setProjects(translatedData);
    } catch (err) {
      setError('Erro ao recarregar projetos');
      console.error('Erro ao recarregar projetos:', err);
      
      // Em caso de erro, usa os dados mockados como fallback
      const translatedMockProjects = translateProjectDescriptions(mockProjects, t);
      setProjects(translatedMockProjects);
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


