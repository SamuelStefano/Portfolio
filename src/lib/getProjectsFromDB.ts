import { supabase } from './supabaseclient';
import { Project } from '../types/project';
import { getProjectImagesFromBucket, discoverProjectsFromBuckets } from './simpleBucketAccess';

export const getProjectsFromDB = async (): Promise<Project[]> => {
  if (!supabase) {
    console.error('❌ Supabase não está configurado');
    return [];
  }

  try {
    // Como a tabela projects não existe, vamos usar apenas o discovery do storage
    const discovered = await discoverProjectsFromBuckets();

    const discoveredAsProjects: Project[] = discovered.map(d => {
      return {
        id: d.storage_path,
        title: d.title,
        role: 'Project',
        description: `Projeto ${d.title} descoberto automaticamente do storage.`,
        long_description: undefined,
        stack: [],
        thumbnail_url: d.thumbnail_url,
        icon_name: 'Code',
        image_categories: d.image_categories,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        project_collaborators: [],
        project_links: [],
        project_sections: [],
        storage_path: d.storage_path,
        auto_discovered: true
      } as Project;
    });

    return discoveredAsProjects;
  } catch (error) {
    console.error('❌ Erro ao buscar projetos do storage:', error);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  if (!supabase) {
    console.error('Supabase não está configurado');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        role,
        description,
        long_description,
        stack,
        thumbnail_url,
        icon_name,
        created_at,
        updated_at
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar projeto:', error);
      return null;
    }

    return {
      ...data,
      project_collaborators: [],
      project_links: [],
      project_sections: []
    };
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return null;
  }
};
