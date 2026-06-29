import React from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
  badge?: React.ReactNode;
}

export const SkillBar = ({ name, level, className, badge }: SkillBarProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          {name}
          {badge}
        </span>
        <span className="text-xs text-muted-foreground">
          {level}%
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000 ease-out animate-scale-in"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;



