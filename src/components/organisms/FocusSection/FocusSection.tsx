import { Blocks, Coins, Link2, Bot, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const ICONS = [Blocks, Coins, Link2, Bot];

export const FocusSection = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14 animate-fade-up">
          <Heading level={2} className="mb-3 gradient-text text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            {t('focus.title')}
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {t('focus.subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ICONS.map((Icon, i) => (
            <div
              key={i}
              className="group rounded-xl border border-border bg-card p-5 hover-card animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <Icon className="h-5 w-5" />
              </div>
              <Heading level={3} className="mb-1.5 text-base sm:text-lg">
                {t(`focus.items.${i}.title`)}
              </Heading>
              <Text className="text-sm leading-relaxed text-muted-foreground">{t(`focus.items.${i}.desc`)}</Text>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {t('focus.open')}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default FocusSection;
