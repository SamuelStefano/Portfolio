import { supabase } from './supabaseclient';
import { Project } from '../types/project';

export const getProjectsFromDB = async (): Promise<Project[]> => {
  if (!supabase) {
    console.error('Supabase não está configurado');
    return [];
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
        image_categories,
        created_at,
        updated_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erro ao buscar projetos:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }


    // Adicionar arrays vazios para as relações (por enquanto)
    const projectsWithEmptyRelations = data.map(project => ({
      ...project,
      project_collaborators: [],
      project_links: [],
      project_images: []
    }));

    return projectsWithEmptyRelations;
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error);
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
      project_images: []
    };
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return null;
  }
};