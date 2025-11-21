import { Project, ProjectImageFolder } from '@/types/project';
import { organizeImagesByFolders } from './organizeImagesByFolders';

export function processProjectImages(project: Project, bucketPath: string): Project {
  if (project.image_folders && project.image_folders.length > 0) {
    return project;
  }

  const imageFolders = organizeImagesByFolders(project.project_images || [], bucketPath);

  return {
    ...project,
    image_folders: imageFolders
  };
}

export function processMultipleProjects(projects: Project[], bucketPath: string): Project[] {
  return projects.map(project => processProjectImages(project, bucketPath));
}

export function extractBucketPathFromUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/').filter(part => part);

    if (pathParts.length >= 3) {
      return pathParts.slice(0, 3).join('/');
    }

    return null;
  } catch {
    return null;
  }
}

export function detectBucketPath(project: Project): string | null {
  if (!project.project_images || project.project_images.length === 0) {
    return null;
  }

  const firstImage = project.project_images[0];
  const imageUrl = firstImage.image_url || firstImage.url;

  if (!imageUrl) {
    return null;
  }

  return extractBucketPathFromUrl(imageUrl);
}




