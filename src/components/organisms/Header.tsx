import { Github, Linkedin, Instagram, Mail, Phone, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '@/components/molecules/SocialLink';
import { Navigation } from '@/components/molecules/Navigation';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { ProgressiveLoader } from '@/components/atoms/ProgressiveLoader';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';

const getSocialLinks = (t: any) => [
  {
    icon: Github,
    href: 'https://github.com/SamuelStefano',
    label: t('hero.socialLinks.github')
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/',
    label: t('hero.socialLinks.linkedin')
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/samuel.stefano',
    label: t('hero.socialLinks.instagram')
  },
  {
    icon: FileText,
    href: 'https://drive.google.com/file/d/1ixNSMlmGtkIedhV8-FUnzbDOE4-GvYel/view?usp=sharing',
    label: t('hero.socialLinks.resume')
  },
  {
    icon: Mail,
    href: 'mailto:samuel@example.com',
    label: t('hero.socialLinks.email')
  },
  {
    icon: Phone,
    href: 'tel:+5544998795387',
    label: t('hero.socialLinks.phone')
  }
];

export const Header = () => {
  const { t } = useTranslation();
  const { containerRef } = useScrollAnimations();
  const { isPhaseLoaded, getPhaseDelay } = useProgressiveLoading();
  const socialLinks = getSocialLinks(t);

  return (
    <>
      <Navigation />
      <header id="inicio" className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card overflow-hidden pt-16 sm:pt-18 md:pt-20" ref={containerRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />

        <div className="absolute top-[15%] left-[8%] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-neon-blue/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[10%] right-[10%] w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <ProgressiveLoader 
          isVisible={isPhaseLoaded('header')} 
          phase="header" 
          delay={getPhaseDelay('header')}
        >
          <div className="relative z-10 text-center w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 animate-fade-up">
            <Heading level={1} className="mb-3 sm:mb-4 md:mb-6 font-inter text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              <span className="gradient-text">{t('hero.greeting')}</span>
            </Heading>
            <Text variant="large" className="font-medium tracking-wide text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-primary">
              {t('hero.role')}
            </Text>
            <Text className="mt-2 sm:mt-3 md:mt-4 opacity-80 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-muted-foreground">
              {t('hero.description')}
            </Text>
          </div>

          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 animate-slide-left">
            <Text variant="large" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm md:text-base lg:text-base xl:text-lg">
              {t('hero.bio')}
              <br className="hidden sm:block" />
              {t('hero.bioContinue')}
            </Text>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 animate-scale-in mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {socialLinks.map((link, index) => (
              <SocialLink
                key={index}
                icon={link.icon}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>

          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 relative z-20 animate-hero-float animate-rotate">
            <div className="w-44 h-44 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 hover:scale-105 mx-auto rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-primary/30 hover:border-primary/60 transition-all duration-500 hover-glow bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center group">
              <img
                src="/Samuel.jpg"
                alt="Samuel Stefano"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="animate-fade-up relative z-10">
            <div className="w-5 h-8 sm:w-6 sm:h-10 md:w-7 md:h-12 border-2 border-muted-foreground/30 rounded-full flex justify-center mx-auto animate-mouse-float">
              <div className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
        </ProgressiveLoader>
      </header>
    </>
  );
};

export default Header;
