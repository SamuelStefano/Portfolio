import { supabase } from './supabaseclient';
import { Project } from '../types/project';
import { getProjectImagesFromBucket, discoverProjectsFromBuckets } from './simpleBucketAccess';

export const getProjectsFromDB = async (): Promise<Project[]> => {
  if (!supabase) {
    console.error('❌ Supabase não está configurado');
    return [];
  }

  try {

    const { mockProjects } = await import('./mockProjects');
    
    // Buscar imagens do storage
    const discovered = await discoverProjectsFromBuckets();
    
    // Combinar dados mockados com imagens do storage
    const projectsWithImages: Project[] = mockProjects.map(mockProject => {
      // Encontrar projeto correspondente no storage pelo título
      const storageProject = discovered.find(d => 
        d.title.toLowerCase().includes(mockProject.title.toLowerCase()) ||
        mockProject.title.toLowerCase().includes(d.title.toLowerCase())
      );
      
      if (storageProject) {
        return {
          ...mockProject,
          image_categories: storageProject.image_categories,
          thumbnail_url: storageProject.thumbnail_url || mockProject.thumbnail_url,
          project_sections: Object.entries(storageProject.image_categories).map(([folder_name, images], index) => ({
            id: `${mockProject.id}-${index + 1}`,
            folder_name,
            display_name: folder_name.charAt(0).toUpperCase() + folder_name.slice(1),
            description: `Imagens da seção ${folder_name}`,
            order_index: index + 1,
            project_images: images.map((image_url, imgIndex) => ({
              id: `${mockProject.id}-${index + 1}-${imgIndex + 1}`,
              image_url,
              order_index: imgIndex + 1
            }))
          }))
        };
      }
      
      return mockProject;
    });
    
    return projectsWithImages;
  } catch (error) {
    console.error('❌ Erro ao combinar dados:', error);
    // Fallback para dados mockados apenas
    const { mockProjects } = await import('./mockProjects');
    return mockProjects;
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
