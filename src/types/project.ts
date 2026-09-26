export interface ProjectCollaborator {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  website?: string;
  created_at: string;
}

export interface ProjectLink {
  id: string;
  label: string;
  title?: string;
  url: string;
  type?: string;
  created_at: string;
}

export interface ProjectImage {
  id: string;
  image_url: string;
  order_index: number;
  created_at?: string;
}

export interface ProjectImageFolder {
  folder_name: string;
  display_name: string;
  description: string;
  icon_name: string;
  images: ProjectImage[];
  order_index: number;
}

export interface ProjectSection {
  id: string;
  folder_name: string;
  display_name: string;
  description: string | null;
  order_index: number;
  project_images: ProjectImage[];
}

/** Catalog entry without texts: descriptions and captions come from the locale files. */
export type ProjectSectionSeed = Omit<ProjectSection, 'description'>;

/** Where a project stands today; drives the badge on cards and the showcase. */
export type ProjectStatus = 'production' | 'personal' | 'hackathon' | 'prototype';

export interface Project {
  id: string;
  title: string;
  role: string;
  status?: ProjectStatus;
  /** Shown in the featured showcase at the top of the projects section. */
  featured?: boolean;
  description: string;
  long_description?: string;
  stack: string[];
  thumbnail_url?: string;
  icon_name: string;
  storage_path?: string;
  image_categories?: Record<string, string[]>;
  project_sections?: ProjectSection[];
  image_folders?: ProjectImageFolder[];
  created_at: string;
  updated_at: string;
  project_collaborators: ProjectCollaborator[];
  project_links: ProjectLink[];
  auto_discovered?: boolean;
}


/** Structure, links, stack and images of a project; `translateProjects` adds the texts. */
export type ProjectSeed = Omit<Project, 'description' | 'long_description' | 'project_sections'> & {
  project_sections?: ProjectSectionSeed[];
};
