import { supabase } from './supabaseclient';
import { Project } from '../types/project';

export const getProjectsFromDB = async (): Promise<Project[]> => {
  if (!supabase) {
    console.error('Supabase não está configurado');
    return [];
  }

  try {
    console.log("🔍 Buscando projetos (versão simplificada)...");

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
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erro ao buscar projetos:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("⚠️ Nenhum projeto encontrado");
      return [];
    }

    console.log(`📊 Projetos encontrados: ${data.length}`);

    const projectsWithEmptyRelations = data.map(project => ({
      ...project,
      project_collaborators: [],
      project_links: [],
      project_sections: []
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
