import { useTranslation } from 'react-i18next';

export const CliAbout = () => {
  const { t } = useTranslation();
  const paragraphs = [t('about.bio1'), t('about.bio2'), t('about.bio3')];

  return (
    <div className="grid max-w-3xl gap-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[13.5px] leading-relaxed text-[var(--cli-text-soft)]">
          <span className="mr-2 text-[var(--cli-text-dim)]">{String(i + 1).padStart(2, '0')}</span>
          {p}
        </p>
      ))}
    </div>
  );
};

export default CliAbout;
