import { lazy, Suspense, useState } from 'react';
import { Trophy, Calendar, MapPin, Users, Github, Maximize2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { ChunkBoundary } from '@/components/atoms/ChunkBoundary/ChunkBoundary';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { HACKATHONS, type Hackathon } from '@/consts/hackathons';

// Radix Dialog only loads when a visitor opens an award.
const AwardModal = lazy(() => import('./AwardModal'));
import { cardSrc, cn } from '@/lib/utils';

const PLACE_STYLE: Record<Hackathon['place'], { step: string; accent: string; ring: string }> = {
  1: { step: 'h-32 xl:h-40', accent: 'from-amber-300 via-yellow-400 to-amber-500', ring: 'border-amber-400/60 shadow-[0_0_40px_-8px_rgba(251,191,36,0.55)]' },
  2: { step: 'h-24 xl:h-28', accent: 'from-slate-200 via-slate-300 to-slate-400', ring: 'border-slate-300/50' },
  4: { step: 'h-20', accent: 'from-orange-300 via-amber-600 to-orange-700', ring: 'border-orange-500/40' },
};
const XL_ORDER = ['xl:order-1', 'xl:order-2', 'xl:order-3', 'xl:order-4'];

// The page lists the awards by ranking; from xl up they stand as a podium: 2nd on the left,
// the first places in the centre and tallest, the rest on the right.
const RANKING = [...HACKATHONS].sort((a, b) => a.place - b.place);
const PODIUM_ORDER = [
  ...RANKING.filter((h) => h.place === 2),
  ...RANKING.filter((h) => h.place === 1),
  ...RANKING.filter((h) => h.place > 2),
];

export const HackathonsSection = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  const [selected, setSelected] = useState<Hackathon | null>(null);
  // stays mounted after the first open so the dialog can play its closing animation
  const [modalMounted, setModalMounted] = useState(false);
  const openAward = (hackathon: Hackathon) => {
    setModalMounted(true);
    setSelected(hackathon);
  };

  return (
    <section id="hackathons" className="py-16 sm:py-20 lg:py-24 bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14 animate-fade-up">
          <Heading level={2} className="mb-3 gradient-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            {t('hackathons.title')}
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground">
            {t('hackathons.subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-end gap-6 md:gap-4">
          {RANKING.map((hackathon, index) => {
            const style = PLACE_STYLE[hackathon.place];
            return (
              <div
                key={hackathon.name}
                className={cn('flex flex-col animate-fade-up', XL_ORDER[PODIUM_ORDER.indexOf(hackathon)])}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <article
                  className={cn(
                    'group relative flex flex-col rounded-2xl border bg-card p-5 sm:p-6 xl:p-5 hover-card cursor-pointer',
                    style.ring,
                  )}
                  onClick={() => openAward(hackathon)}
                >
                  {hackathon.photo && (
                    <div className="relative -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 xl:-mx-5 xl:-mt-5 mb-4 h-40 overflow-hidden rounded-t-2xl">
                      <img
                        src={cardSrc(hackathon.photo)}
                        onError={(e) => { if (hackathon.photo) e.currentTarget.src = hackathon.photo; }}
                        alt={`${hackathon.name} — ${hackathon.event}`}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    </div>
                  )}

                  <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
                    <Trophy className="h-3.5 w-3.5" />
                    {t(hackathon.achievementKey)}
                  </div>
                  <Heading level={3} className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                    {hackathon.name}
                  </Heading>
                  <Text className="mb-4 text-sm text-muted-foreground">{hackathon.event}</Text>

                  <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>{hackathon.location}</span>
                      <Calendar className="ml-1 h-3.5 w-3.5 flex-shrink-0" />
                      <span>{hackathon.date}</span>
                    </div>
                    {hackathon.team && (
                      <div className="flex items-start gap-2">
                        <Users className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                        <span>{hackathon.teamKey ? t(hackathon.teamKey) : hackathon.team.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <Text className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {t(hackathon.descriptionKey)}
                  </Text>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {hackathon.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); openAward(hackathon); }}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 group-hover:gap-3"
                    >
                      <Maximize2 className="h-4 w-4" />
                      {t('hackathons.viewDetails')}
                    </button>
                    <a
                      href={hackathon.githubLink ?? hackathon.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {hackathon.githubLink ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                      {hackathon.githubLink ? 'GitHub' : t('hackathons.viewEvent')}
                    </a>
                  </div>
                </article>

                {/* podium step */}
                <div
                  className={cn(
                    'relative mt-3 flex items-start justify-center rounded-t-xl border border-b-0 border-white/10 bg-gradient-to-b',
                    style.step,
                    style.accent,
                  )}
                >
                  <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-transparent via-background/30 to-background/80" />
                  <div className="relative mt-3 flex flex-col items-center text-background">
                    <span className="text-3xl md:text-4xl font-black leading-none drop-shadow">{hackathon.place}</span>
                    <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider">
                      {t(`hackathons.places.${hackathon.place}`)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-1.5 rounded-b-xl bg-gradient-to-r from-primary/30 via-neon-purple/30 to-neon-cyan/30" />
        <Text className="mt-4 text-center text-xs text-muted-foreground">{t('hackathons.podiumHint')}</Text>
      </div>

      {modalMounted && (
        <ChunkBoundary>
          <Suspense fallback={null}>
            <AwardModal
              hackathon={selected}
              open={selected !== null}
              onOpenChange={(o) => !o && setSelected(null)}
            />
          </Suspense>
        </ChunkBoundary>
      )}
    </section>
  );
};

export default HackathonsSection;
