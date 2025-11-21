// Section Metadata Types
export interface SectionMetadata {
  display_name: string;
  description: string;
  order_index: number;
}

// Storage Types
export interface ProjectImageFolder {
  folder_name: string;
  display_name: string;
  description: string;
  order_index: number;
  images: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  image_url: string;
  order_index: number;
}

// Discovered Project Types
export interface DiscoveredProject {
  bucket: string;
  storage_path: string;
  title: string;
  image_categories: Record<string, string[]>;
  thumbnail_url?: string;
}

// Utility Types
export type ClassValue = string | number | boolean | undefined | null | ClassValue[];

// Icon Resolver Types
export type LucideIconName = 
  | 'code' | 'users' | 'library' | 'monitor' | 'server' | 'database' 
  | 'globe' | 'mobile' | 'laptop' | 'palette' | 'shield' | 'settings'
  | 'dollar-sign' | 'bar-chart-3' | 'default';




