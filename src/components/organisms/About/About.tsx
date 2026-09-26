import { createElement } from 'react';
import { MapPin, GraduationCap, Languages, GitPullRequest, GitBranch, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/atoms/Text/Text';
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader';
import { useExperienceTime } from '@/hooks/useExperienceTime';
import { useGitHubStats } from '@/hooks/useGitHubStats';

const PHOTOS = ['/dfl/dfl-1.jpg', '/dfl/dfl-2.jpg', '/dfl/dfl-3.jpg'];

export const About = () => {
  const { t } = useTranslation();
  const experienceTime = useExperienceTime();
  const gitHubStats = useGitHubStats();

  const stats = [
    { icon: Calendar, value: experienceTime.formatted, label: t('about.professionalTime') },
    { icon: GitPullRequest, value: gitHubStats.isLoading ? '…' : `${gitHubStats.mergedPullRequests}+`, label: t('about.pullRequests') },
    { icon: GitBranch, value: gitHubStats.isLoading ? '…' : `${gitHubStats.totalRepos}+`, label: t('about.projectsCreated') },
  ];

  const facts = [
    { icon: MapPin, text: t('about.location') },
    { icon: GraduationCap, text: t('about.education') },
    { icon: Languages, text: t('skills.languages') },
  ];

  return (
    <section id="sobre" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('about.title')} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16">
          <div>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <Text className="text-base text-muted-foreground">{t('about.bio1')}</Text>
              <Text className="text-base text-muted-foreground">{t('about.bio2')}</Text>
            </div>

            <ul className="mt-6 space-y-2.5">
              {facts.map((fact) => (
                <li key={fact.text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  {createElement(fact.icon, { className: 'mt-0.5 h-4 w-4 flex-shrink-0 text-primary' })}
                  <span>{fact.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                  {createElement(stat.icon, { className: 'mb-2 h-4 w-4 text-primary' })}
                  <p className="text-base sm:text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {PHOTOS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Samuel Stefano na DevFellowship ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
