import { useState } from 'react';
import { Trophy, Calendar, MapPin, Users, Github, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader';
import { HACKATHONS, type Hackathon } from '@/consts/hackathons';
import { EVENTS_DATA } from '@/consts/data';
import { AwardModal } from './AwardModal';

export const HackathonsSection = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Hackathon | null>(null);

  return (
    <section id="hackathons" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('hackathons.title')} subtitle={t('hackathons.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HACKATHONS.map((hackathon) => (
            <article
              key={hackathon.name}
              className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 transition-colors duration-200 hover:border-primary/40"
            >
              <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
                <Trophy className="h-3.5 w-3.5" />
                {t(hackathon.achievementKey)}
              </div>
              <Heading level={3} className="text-xl md:text-xl font-bold">
                {hackathon.name}
              </Heading>
              <Text className="mb-4 text-sm text-muted-foreground">{hackathon.event}</Text>

              <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{hackathon.location} · {hackathon.date}</span>
                </div>
                {hackathon.team && (
                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    <span>{hackathon.team.join(', ')}</span>
                  </div>
                )}
              </div>

              <Text className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {t(hackathon.descriptionKey)}
              </Text>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {hackathon.technologies.slice(0, 6).map((tech) => (
                  <span key={tech} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs font-mono text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                <button
                  onClick={() => setSelected(hackathon)}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Maximize2 className="h-4 w-4" />
                  {t('hackathons.viewDetails')}
                </button>
                <a
                  href={hackathon.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>

        <div id="eventos" className="mt-12">
          <Heading level={3} className="mb-4 text-base md:text-base font-semibold text-foreground">
            {t('hackathons.eventsTitle')}
          </Heading>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EVENTS_DATA.map((ev) => (
              <li key={ev.name} className="rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{ev.name}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {t(`hackathons.eventTypes.${ev.type}`)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{ev.date}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>
                  <span>{ev.ecosystems.join(' · ')}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AwardModal
        hackathon={selected}
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      />
    </section>
  );
};

export default HackathonsSection;




