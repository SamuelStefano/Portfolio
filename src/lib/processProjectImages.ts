import { Project, ProjectImageFolder } from '@/types/project';
import { organizeImagesByFolders } from './organizeImagesByFolders';

/**
 * Processa as imagens de um projeto e as organiza por pastas do bucket
 * @param project Projeto com imagens
 * @param bucketPath Caminho base do bucket (ex: "Portfolio/challenges/Skill Evals")
 * @returns Projeto com image_folders preenchido
 */
export function processProjectImages(project: Project, bucketPath: string): Project {
  // Se já tem image_folders, não processar novamente
  if (project.image_folders && project.image_folders.length > 0) {
    return project;
  }

  // Organizar imagens por pastas
  const imageFolders = organizeImagesByFolders(project.project_images || [], bucketPath);

  return {
    ...project,
    image_folders: imageFolders
  };
}

/**
 * Processa múltiplos projetos
 * @param projects Array de projetos
 * @param bucketPath Caminho base do bucket
 * @returns Array de projetos processados
 */
export function processMultipleProjects(projects: Project[], bucketPath: string): Project[] {
  return projects.map(project => processProjectImages(project, bucketPath));
}

/**
 * Extrai o caminho do bucket a partir de uma URL de imagem
 * @param imageUrl URL da imagem
 * @returns Caminho do bucket ou null se não encontrado
 */
export function extractBucketPathFromUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/').filter(part => part);
    
    // Assumir que o bucket está na primeira parte do caminho
    if (pathParts.length >= 3) {
      return pathParts.slice(0, 3).join('/');
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Detecta automaticamente o caminho do bucket baseado nas imagens do projeto
 * @param project Projeto com imagens
 * @returns Caminho do bucket detectado ou null
 */
export function detectBucketPath(project: Project): string | null {
  if (!project.project_images || project.project_images.length === 0) {
    return null;
  }

  // Tentar detectar o caminho baseado na primeira imagem
  const firstImage = project.project_images[0];
  const imageUrl = firstImage.image_url || firstImage.url;
  
  if (!imageUrl) {
    return null;
  }

  return extractBucketPathFromUrl(imageUrl);
}

