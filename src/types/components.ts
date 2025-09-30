import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Project } from './project';

// Component Props Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export interface TextProps {
  variant?: 'default' | 'large' | 'small' | 'muted';
  className?: string;
  children: ReactNode;
}

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
}

export interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SocialLinkProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface SkillBarProps {
  name: string;
  level: number;
}

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export interface ProjectOverlayProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ImageCarouselProps {
  images: string[];
  title?: string;
}

export interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  logo: string;
  icon: LucideIcon;
  website?: string | null;
}

export interface StatsCounterProps {
  stats: StatItem[];
}

export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface TechCategory {
  title: string;
  icon: React.ComponentType<any>;
  skills: { name: string; level: number }[];
  color: string;
}

// Dialog Types
export interface DialogProps {
  children: ReactNode;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

// Tabs Types
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

// Tooltip Types
export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}
