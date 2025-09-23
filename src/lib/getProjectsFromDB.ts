import { supabase } from './supabaseclient';
import { Project } from '../types/project';
import { getProjectImagesFromBucket, discoverProjectsFromBuckets } from './simpleBucketAccess';

export const getProjectsFromDB = async (): Promise<Project[]> => {
  if (!supabase) {
    console.error('❌ Supabase não está configurado');
    return [];
  }

  try {

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erro ao buscar projetos:", error);
      return [];
    }

    const dbProjects: Project[] = await Promise.all(
      (data || []).map(async (project) => {
        try {
          const imageCategories = await getProjectImagesFromBucket(project.title);

          return {
            ...project,
            image_categories: imageCategories,
            project_collaborators: [],
            project_links: [],
            project_images: []
          };
        } catch (error) {
          console.error(`❌ Erro ao buscar imagens para ${project.title}:`, error);
          return {
            ...project,
            image_categories: project.image_categories || {},
            project_collaborators: [],
            project_links: [],
            project_images: []
          };
        }
      })
    );

    const discovered = await discoverProjectsFromBuckets();

    const storagePathToDb = new Map<string, Project>();
    dbProjects.forEach(p => {
      if (p as any && (p as any).storage_path) storagePathToDb.set((p as any).storage_path as string, p);
    });

    const discoveredAsProjects: Project[] = discovered.map(d => {
      const db = storagePathToDb.get(d.storage_path);
      return {
        id: db?.id || d.storage_path,
        title: db?.title || d.title,
        role: db?.role || 'Project',
        description: db?.description || '',
        long_description: db?.long_description || undefined,
        stack: db?.stack || [],
        thumbnail_url: db?.thumbnail_url || d.thumbnail_url,
        icon_name: db?.icon_name || 'Code',
        image_categories: d.image_categories,
        created_at: db?.created_at || new Date().toISOString(),
        updated_at: db?.updated_at || new Date().toISOString(),
        project_collaborators: db?.project_collaborators || [],
        project_links: db?.project_links || [],
        project_sections: db?.project_sections || [],
        storage_path: db?.storage_path || d.storage_path,
        auto_discovered: !db
      } as Project;
    });

    if (dbProjects.length === 0) {
      return discoveredAsProjects;
    }

    const merged: Project[] = [...dbProjects];

    for (const p of discoveredAsProjects) {
      const exists = merged.find(m => {
        const sameTitle = m.title === p.title;
        const spM = (m as any).storage_path as string | undefined;
        const spP = (p as any).storage_path as string | undefined;
        const sameStoragePath = spM && spP ? spM === spP : false;
        return sameTitle || sameStoragePath;
      });
      if (!exists) {
        if (includeAutoDiscovered) {
          if (requireStorageMatch) {
            if (p.storage_path) merged.push(p);
          } else {
            merged.push(p);
          }
        }
      }
    }

    return merged;
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
