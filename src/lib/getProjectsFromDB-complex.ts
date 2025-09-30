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
      created_at,
      updated_at,
      project_sections (
        id,
        folder_name,
        display_name,
        description,
        order_index,
        project_images (
          id,
          image_url,
          order_index
        )
      )
    `)
    .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erro ao buscar projetos:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    const projectsWithRelations = data.map(project => ({
      ...project,
      project_collaborators: [],
      project_links: [],
      project_sections: project.project_sections?.map(section => ({
        ...section,
        project_images: section.project_images?.sort((a, b) => a.order_index - b.order_index) || []
      })).sort((a, b) => a.order_index - b.order_index) || []
    }));

    return projectsWithRelations;
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
        long_description,
        stack,
        thumbnail_url,
        icon_name,
        created_at,
        updated_at,
        project_sections (
          id,
          folder_name,
          display_name,
          description,
          order_index,
            project_images (
              id,
              image_url,
              order_index
            )
        )
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
      project_sections: data.project_sections?.map(section => ({
        ...section,
        project_images: section.project_images?.sort((a, b) => a.order_index - b.order_index) || []
      })).sort((a, b) => a.order_index - b.order_index) || []
    };
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return null;
  }
};