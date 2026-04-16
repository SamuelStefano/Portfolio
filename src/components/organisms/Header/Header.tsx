import { Github, Linkedin, Instagram, Mail, Phone, FileText, MapPin, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '@/components/molecules/SocialLink/SocialLink';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { ProgressiveLoader } from '@/components/atoms/ProgressiveLoader/ProgressiveLoader';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';

const getSocialLinks = (t: any) => [
  { icon: Github,   href: 'https://github.com/SamuelStefano',                                                                label: t('hero.socialLinks.github')   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/',                                           label: t('hero.socialLinks.linkedin')  },
  { icon: Instagram,href: 'https://instagram.com/samuel.stefano',                                                            label: t('hero.socialLinks.instagram') },
  { icon: FileText, href: 'https://drive.google.com/file/d/1zbvD8g7rK3rSmMfeCPAR8o-DQ4zeYAvN/view?usp=sharing',            label: t('hero.socialLinks.resume')    },
  { icon: Mail,     href: 'mailto:samuel@example.com',                                                                       label: t('hero.socialLinks.email')     },
  { icon: Phone,    href: 'tel:+5544998795387',                                                                              label: t('hero.socialLinks.phone')     },
];

export const Header = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  const { isPhaseLoaded, getPhaseDelay } = useProgressiveLoading();
  const socialLinks = getSocialLinks(t);

  return (
    <>
      <Navigation />
      <header
        id="inicio"
        ref={containerRef}
        className="relative w-full min-h-screen flex items-center bg-background overflow-hidden pt-16"
      >
        {/* dot-grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(var(--muted-foreground)/0.15)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />

        <ProgressiveLoader
          isVisible={isPhaseLoaded('header')}
          phase="header"
          delay={getPhaseDelay('header')}
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* ── Left: text ── */}
              <div className="order-2 lg:order-1 animate-fade-up">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    DevFellowship · Tech Lead
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                    <MapPin className="w-3 h-3" />
                    Marialva, PR
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                    <GraduationCap className="w-3 h-3" />
                    ADS 3º ano
                  </span>
                </div>

                <Heading level={1} className="mb-3 font-inter text-4xl sm:text-5xl xl:text-6xl leading-tight">
                  <span className="gradient-text">{t('hero.greeting')}</span>
                </Heading>

                <Text variant="large" className="font-semibold tracking-wide text-xl sm:text-2xl text-primary mb-4">
                  {t('hero.role')}
                </Text>

                <Text className="text-muted-foreground text-sm sm:text-base mb-6 max-w-lg leading-relaxed">
                  {t('hero.bio')}
                  {' '}
                  {t('hero.bioContinue')}
                </Text>

                <div className="flex flex-wrap gap-3 mb-8">
                  {socialLinks.map((link, i) => (
                    <SocialLink key={i} icon={link.icon} href={link.href} label={link.label} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {['React', 'Next.js', 'TypeScript', 'Module Federation', 'Supabase', 'Claude API', 'n8n'].map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded-md border border-border bg-card font-mono hover:border-primary/50 hover:text-primary transition-colors duration-200 cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Right: photo ── */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-scale-in">
                <div className="relative">
                  {/* Pulsing glow behind photo */}
                  <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-neon-blue/25 to-neon-purple/25 blur-3xl animate-pulse-glow" />

                  {/* Floating + breathing photo wrapper */}
                  <div className="relative animate-float">
                    {/* Neon border frame that breathes */}
                    <div
                      className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden
                        border-2 border-primary/30 hover:border-primary/60 transition-colors duration-500 hover-glow"
                      style={{ animation: 'float 5s ease-in-out infinite, pulse-glow 3s ease-in-out infinite' }}
                    >
                      <img
                        src="/Samuel.jpg"
                        alt="Samuel Stefano"
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                      />
                      {/* Subtle inner overlay that pulses */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/10 via-transparent to-neon-blue/5 pointer-events-none animate-gradient-shift" />
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />
                    <div className="absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-neon-purple/50 rounded-tl-xl" />

                    {/* Orbiting dot */}
                    <div
                      className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-2xl pointer-events-none"
                      style={{ animation: 'none' }}
                    >
                      <span
                        className="absolute w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_currentColor]"
                        style={{
                          top: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          animation: 'float 3s ease-in-out infinite',
                          animationDelay: '1s',
                        }}
                      />
                    </div>
                  </div>

                  {/* "Open to work" badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-card border border-green-500/30 rounded-full px-3 py-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium whitespace-nowrap">Open to work</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ProgressiveLoader>
      </header>
    </>
  );
};

export default Header;
