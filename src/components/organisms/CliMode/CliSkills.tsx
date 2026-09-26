import { useTranslation } from 'react-i18next';
import { TECH_CATEGORIES } from '@/consts/data';

export const CliSkills = () => {
  const { t } = useTranslation();
  return (
  <div className="grid gap-5 sm:grid-cols-2">
    {TECH_CATEGORIES.map((cat) => (
      <div key={cat.key}>
        <div className="mb-2 text-sm font-bold text-[var(--cli-amber)]"># {t(`skills.categories.${cat.key}`)}</div>
        <div className="grid gap-1">
          {cat.skills.map((s) => (
            <div key={s.name} className="flex items-center gap-3 text-xs">
              <span className="w-[150px] flex-shrink-0 text-[var(--cli-text-soft)]">{s.name}</span>
              <span className="text-[var(--cli-text-dim)]">{t(`skills.tiers.${s.tier}`)}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  );
};

export default CliSkills;
