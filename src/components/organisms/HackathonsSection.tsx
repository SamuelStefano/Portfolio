import { Trophy, Calendar, MapPin, Users, ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

interface Hackathon {
  name: string;
  event: string;
  location: string;
  date: string;
  achievement: string;
  project: string;
  projectLink: string;
  githubLink: string;
  description: string;
  technologies: string[];
  team?: string[];
  image?: string;
}

const getHackathonsData = (t: any): Hackathon[] => [
  {
    name: 'GreenLoop',
    event: 'ETH Latam 2025',
    location: 'São Paulo, Brasil',
    date: 'Março 2025',
    achievement: '4º Lugar Geral',
    project: 'GreenLoop',
    projectLink: 'https://greenloop-zeta.vercel.app/',
    githubLink: 'https://github.com/RaulAl3n/GreenLoop',
    description: t('hackathons.greenloop.description'),
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'Solidity', 'ERC-20', 'ERC-721', 'Base', 'Smart Contracts', 'Web3'],
    team: ['Samuel Stefano', 'Guilherme Biensfeld', 'Raul Alencar'],
    image: '/public/projects/greenloop/thumb.png'
  },
  {
    name: 'TalentDAO',
    event: 'DevConnect ETH 2025',
    location: 'Buenos Aires, Argentina',
    date: 'Fevereiro 2025',
    achievement: 'Participação',
    project: 'TalentDAO',
    projectLink: 'https://devconnect-talent-dao.vercel.app/',
    githubLink: 'https://github.com/taigfs/devconnect-talent-dao',
    description: t('hackathons.talentdao.description'),
    technologies: ['TypeScript', 'Next.js', 'Solidity', 'ERC-20', 'ERC-721', 'WETH', 'Web3', 'Smart Contracts'],
    team: ['Tainan Fidelis', 'Samuel Stefano']
  }
];

export const HackathonsSection = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  const hackathons = getHackathonsData(t);

  return (
    <section id="hackathons" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 animate-fade-up">
          <Heading level={2} className="mb-3 sm:mb-4 md:mb-6 gradient-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {t('hackathons.title')}
          </Heading>
          <Text variant="large" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {t('hackathons.subtitle')}
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {hackathons.map((hackathon, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden hover-card animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Header com achievement */}
              <div className="bg-gradient-primary p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-sm sm:text-base">{hackathon.achievement}</span>
                    </div>
                    <Heading level={3} className="text-white text-lg sm:text-xl md:text-2xl mb-2">
                      {hackathon.name}
                    </Heading>
                    <Text className="text-white/80 text-sm sm:text-base">{hackathon.event}</Text>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Info */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{hackathon.date}</span>
                  </div>
                  {hackathon.team && (
                    <div className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-1" />
                      <div className="flex flex-wrap gap-1">
                        {hackathon.team.map((member, idx) => (
                          <span key={idx}>
                            {member}
                            {idx < hackathon.team!.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <Text className="mb-5 text-sm sm:text-base leading-relaxed">
                  {hackathon.description}
                </Text>

                {/* Technologies */}
                <div className="mb-5">
                  <Text className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 uppercase">
                    {t('hackathons.technologies')}
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs sm:text-sm text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={hackathon.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm sm:text-base font-medium group-hover:gap-3"
                  >
                    <span>{t('hackathons.viewProject')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={hackathon.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-card border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm sm:text-base font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonsSection;

