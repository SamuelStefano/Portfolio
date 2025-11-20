export interface ProjectCollaborator {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
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

export interface Project {
  id: string;
  title: string;
  role: string;
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

export type LucideIconName =
  | 'Code'
  | 'ShoppingCart'
  | 'Smartphone'
  | 'BarChart3'
  | 'Server'
  | 'Globe'
  | 'Database'
  | 'Zap'
  | 'Shield'
  | 'Rocket'
  | 'Palette'
  | 'Cpu'
  | 'Cloud'
  | 'Lock'
  | 'Users'
  | 'Settings'
  | 'Briefcase'
  | 'GraduationCap'
  | 'Monitor'
  | 'Laptop'
  | 'Tablet'
  | 'Watch'
  | 'Headphones'
  | 'Camera'
  | 'Video'
  | 'Music'
  | 'Gamepad2'
  | 'Book'
  | 'FileText'
  | 'Image'
  | 'Film'
  | 'Mic'
  | 'Speaker'
  | 'Wifi'
  | 'Bluetooth'
  | 'Battery'
  | 'Plug'
  | 'Wrench'
  | 'Package'
  | 'Archive'
  | 'Folder'
  | 'File'
  | 'Download'
  | 'Upload'
  | 'Share'
  | 'Copy'
  | 'Edit'
  | 'Trash2'
  | 'Save'
  | 'Search'
  | 'Filter'
  | 'Grid'
  | 'List'
  | 'Layout'
  | 'Sidebar'
  | 'Menu'
  | 'X'
  | 'Check'
  | 'Plus'
  | 'Minus'
  | 'ArrowRight'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ChevronRight'
  | 'ChevronLeft'
  | 'ChevronUp'
  | 'ChevronDown'
  | 'ExternalLink'
  | 'Link'
  | 'Mail'
  | 'Phone'
  | 'MapPin'
  | 'Calendar'
  | 'Clock'
  | 'Star'
  | 'Heart'
  | 'ThumbsUp'
  | 'ThumbsDown'
  | 'Flag'
  | 'AlertCircle'
  | 'Info'
  | 'CheckCircle'
  | 'XCircle'
  | 'HelpCircle'
  | 'Eye'
  | 'EyeOff'
  | 'Unlock'
  | 'Key'
  | 'ShieldCheck'
  | 'ShieldAlert'
  | 'ShieldX'
  | 'ShieldOff'
  | 'User'
  | 'UserCheck'
  | 'UserX'
  | 'UserPlus'
  | 'UserMinus'
  | 'UserCircle'
  | 'UserSquare'
  | 'Bot'
  | 'Crown'
  | 'Award'
  | 'Trophy'
  | 'Medal'
  | 'Gift'
  | 'Tag'
  | 'Tags'
  | 'Bookmark'
  | 'BookmarkCheck'
  | 'BookmarkX'
  | 'BookmarkPlus'
  | 'BookmarkMinus'
  | 'Pin'
  | 'PinOff'
  | 'Target'
  | 'Crosshair'
  | 'Focus'
  | 'Sun'
  | 'Moon'
  | 'CloudRain'
  | 'CloudSnow'
  | 'CloudLightning'
  | 'CloudDrizzle'
  | 'CloudFog'
  | 'Wind'
  | 'Droplets'
  | 'Thermometer'
  | 'Umbrella'
  | 'TreePine'
  | 'TreeDeciduous'
  | 'Flower'
  | 'Leaf'
  | 'Bug'
  | 'Fish'
  | 'Bird'
  | 'Cat'
  | 'Dog'
  | 'Rabbit'
  | 'Turtle';