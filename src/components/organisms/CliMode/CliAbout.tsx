import { useTranslation } from 'react-i18next';

export const CliAbout = () => {
  const { t } = useTranslation();
  const paragraphs = [t('about.bio1'), t('about.bio2'), t('about.bio3')];

  return (
    <div className="cli-card max-w-3xl rounded-lg p-5">
      <span className="cli-sweep" />
      <div className="mb-4 flex items-center gap-2 text-xs text-[var(--cli-text-dim)]">
        <span className="text-[var(--cli-green)]">●</span>
        <span>~/about/bio.md</span>
        <span className="ml-auto rounded border border-[var(--cli-border)] px-1.5 py-0.5">markdown</span>
      </div>
      <div className="grid gap-4">
        {paragraphs.map((p, i) => (
          <div key={i} className="flex gap-3">
            <span className="select-none pt-0.5 text-right text-[11px] font-bold tabular-nums text-[var(--cli-green)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="border-l border-[var(--cli-border)] pl-3 text-[13.5px] leading-relaxed text-[var(--cli-text-soft)]">
              {p}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CliAbout;
