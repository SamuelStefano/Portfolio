import React from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
}

export const SkillBar = ({ name, level, className }: SkillBarProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">
          {name}
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



