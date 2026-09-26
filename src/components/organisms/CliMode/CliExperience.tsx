import { useTranslation } from 'react-i18next';
import { EXPERIENCE_DATA } from '@/consts/data';

export const CliExperience = () => {
  const { t } = useTranslation();
  return (
    <div className="grid gap-5">
      {EXPERIENCE_DATA.map((job) => (
        <div key={job.company} className="border-l-2 border-[var(--cli-border)] pl-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[var(--cli-amber)]">commit</span>
            <span className="text-[15px] font-bold text-[var(--cli-text-bright)]">{t(`experience.items.${job.key}.role`)}</span>
          </div>
          <div className="mt-1 text-xs text-[var(--cli-text-dim)]">
            <span className="text-[var(--cli-green)]">@{job.company}</span>
            <span className="mx-2">·</span>
            <span>{t(`experience.items.${job.key}.period`)}</span>
            {job.website && (
              <>
                <span className="mx-2">·</span>
                <a href={job.website} target="_blank" rel="noopener noreferrer" className="text-[var(--cli-text-soft)] underline-offset-2 hover:underline">
                  {new URL(job.website).hostname.replace(/^www\./, '')}
                </a>
              </>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[var(--cli-text-soft)]">{t(`experience.items.${job.key}.description`)}</p>
          {job.stack.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.stack.slice(0, 8).map((tech) => (
                <span key={tech} className="rounded border border-[var(--cli-border)] px-1.5 py-0.5 text-[11px] text-[var(--cli-text-dim)]">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CliExperience;
