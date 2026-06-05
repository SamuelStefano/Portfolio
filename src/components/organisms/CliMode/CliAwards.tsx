import { useTranslation } from 'react-i18next';
import { HACKATHONS } from '@/consts/hackathons';

export const CliAwards = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-3">
      {HACKATHONS.map((h) => (
        <div key={h.name} className="rounded-lg border border-[var(--cli-border)] bg-[var(--cli-surface)] p-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[var(--cli-amber)]">★</span>
            <span className="text-[15px] font-bold text-[var(--cli-text-bright)]">{h.name}</span>
            <span className="text-xs text-[var(--cli-text-dim)]">— {h.event}</span>
          </div>
          <div className="mt-1 text-sm font-semibold text-[var(--cli-amber)]">{t(h.achievementKey)}</div>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-[var(--cli-text-soft)]">{t(h.descriptionKey)}</p>
          <div className="mt-2 text-xs text-[var(--cli-text-dim)]">
            <span className="text-[var(--cli-green)]">stack:</span> {h.technologies.join(' · ')}
          </div>
          <div className="mt-2 flex gap-4 text-xs font-medium">
            <a href={h.projectLink} target="_blank" rel="noopener noreferrer" className="text-[var(--cli-cyan)] hover:underline">→ {t('hackathons.viewProject')}</a>
            <a href={h.githubLink} target="_blank" rel="noopener noreferrer" className="text-[var(--cli-cyan)] hover:underline">→ GitHub</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CliAwards;
