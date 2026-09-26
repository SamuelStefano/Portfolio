import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types/project';

const DOT: Record<ProjectStatus, string> = {
  production: 'bg-emerald-500',
  hackathon: 'bg-amber-400',
  personal: 'bg-sky-400',
  prototype: 'bg-slate-400',
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

/** Dot carries the colour, the label stays in the foreground colour so it reads on any theme. */
export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const { t } = useTranslation();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/90 px-2.5 py-0.5 text-[11px] font-medium text-foreground',
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === 'production' && (
          <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping', DOT[status])} />
        )}
        <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', DOT[status])} />
      </span>
      {t(`projects.status.${status}`)}
    </span>
  );
};

export default StatusBadge;
