import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
};

export const Icon = ({ icon: IconComponent, size = 'md', className }: IconProps) => {
  return (
    <IconComponent 
      className={cn(sizeClasses[size], className)} 
    />
  );
};

export default Icon;
