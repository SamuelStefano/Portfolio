import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SkillEvidence {
  /** How many projects back this skill up. */
  count: number;
  /** Accessible label, e.g. "4 projects". */
  label: string;
  expanded: boolean;
  onToggle: () => void;
  /** id of the panel this row controls */
  controls: string;
}

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
  badge?: ReactNode;
  /** When present the row becomes a button that reveals the projects using the skill. */
  evidence?: SkillEvidence;
}

const Bar = ({ level }: { level: number }) => (
  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000 ease-out animate-scale-in"
      style={{ width: `${level}%` }}
    />
  </div>
);

export const SkillBar = ({ name, level, className, badge, evidence }: SkillBarProps) => {
  if (!evidence) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            {name}
            {badge}
          </span>
          <span className="text-xs text-muted-foreground">{level}%</span>
        </div>
        <Bar level={level} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={evidence.onToggle}
      aria-expanded={evidence.expanded}
      aria-controls={evidence.controls}
      className={cn(
        'group/skill -mx-2 block w-[calc(100%+1rem)] space-y-2 rounded-md px-2 py-1 text-left transition-colors duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        evidence.expanded && 'bg-primary/10',
        className,
      )}
    >
      <span className="flex justify-between items-center gap-2">
        <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-foreground">
          <span className="truncate">{name}</span>
          {badge}
          <span
            aria-label={evidence.label}
            title={evidence.label}
            className={cn(
              'inline-flex h-4 min-w-4 items-center justify-center rounded px-1 font-mono text-[10px] leading-none transition-colors',
              evidence.expanded
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/70 text-muted-foreground group-hover/skill:bg-primary/15 group-hover/skill:text-primary',
            )}
          >
            {evidence.count}
          </span>
        </span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </span>
      <Bar level={level} />
    </button>
  );
};

export default SkillBar;
