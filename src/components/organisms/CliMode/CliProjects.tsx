import { useTranslation } from 'react-i18next';
import { useProjects } from '@/hooks/useProjects';

export const CliProjects = () => {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();

  if (loading) {
    return <div className="text-sm text-[var(--cli-text-dim)]">$ loading projects<span className="cli-cursor" /></div>;
  }

  return (
    <div className="grid gap-4">
      <div className="text-xs text-[var(--cli-text-dim)]">
        total {projects.length} · drwxr-xr-x
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((p) => {
        const link = p.project_links.find((l) => l.url)?.url;
        return (
          <div key={p.id} className="cli-card flex flex-col rounded-lg p-4">
            <span className="cli-sweep" />
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-[var(--cli-amber)]">▸</span>
              <span className="text-[15px] font-bold text-[var(--cli-text-bright)]">{p.title}</span>
              <span className="text-xs text-[var(--cli-text-dim)]">— {p.role}</span>
            </div>
            <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-[var(--cli-text-soft)]">{p.description}</p>
            {p.stack.length > 0 && (
              <div className="mt-2 text-xs text-[var(--cli-text-dim)]">
                <span className="text-[var(--cli-green)]">stack:</span> {p.stack.join(' · ')}
              </div>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-medium text-[var(--cli-cyan)] hover:underline"
              >
                → {t('hackathons.viewProject')}
              </a>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default CliProjects;
