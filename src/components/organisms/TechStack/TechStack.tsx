import { createElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader';
import { TECH_CATEGORIES, SKILL_TIERS, type SkillTier } from '@/consts/data';
import { cn } from '@/lib/utils';

const TIER_CHIP: Record<SkillTier, string> = {
  daily: 'border-primary/40 bg-primary/10 text-foreground',
  shipped: 'border-border bg-muted/40 text-foreground',
  learning: 'border-dashed border-border bg-transparent text-muted-foreground',
};

const TIER_DOT: Record<SkillTier, string> = {
  daily: 'bg-primary',
  shipped: 'bg-muted-foreground/70',
  learning: 'border border-dashed border-muted-foreground bg-transparent',
};

export const TechStack = () => {
  const { t } = useTranslation();

  return (
    <section id="habilidades" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {SKILL_TIERS.map((tier) => (
            <span key={tier} className="inline-flex items-center gap-2">
              <span className={cn('h-2.5 w-2.5 rounded-full', TIER_DOT[tier])} />
              {t(`skills.tiers.${tier}`)}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_CATEGORIES.map((category) => (
            <div key={category.key} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  {createElement(category.icon, { className: 'h-4 w-4 text-primary' })}
                </div>
                <Heading level={3} className="text-base md:text-base font-semibold">
                  {t(`skills.categories.${category.key}`)}
                </Heading>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    title={t(`skills.tiers.${skill.tier}`)}
                    className={cn('rounded-md border px-2.5 py-1 text-xs font-medium', TIER_CHIP[skill.tier])}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
          <Languages className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
          <Text className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{t('skills.languagesTitle')}:</span> {t('skills.languages')}
          </Text>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
