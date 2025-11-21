import { Github, Linkedin, Instagram, Mail, Phone, Heart, Code, FileText, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/button/button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';

const getSocialLinks = (t: any) => [
  {
    icon: Github,
    href: 'https://github.com/SamuelStefano',
    label: t('hero.socialLinks.github')
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/samuel-stefano',
    label: t('hero.socialLinks.linkedin')
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/samuel.stefano',
    label: t('hero.socialLinks.instagram')
  },
  {
    icon: FileText,
    href: 'https://drive.google.com/file/d/1-TpoRcofaK4T-rZZFWouQctZhW4Q9kpp/view?usp=sharing',
    label: t('hero.socialLinks.resume')
  }
];

const contactInfo = [
  {
    icon: Mail,
    label: 'samuelstefanodocarmo@gmail.com',
    href: 'mailto:samuelstefanodocarmo@gmail.com'
  },
  {
    icon: Phone,
    label: '+55 (44) 99879-5387',
    href: 'tel:+5544998795387'
  }
];

const getQuickLinks = (t: any) => [
  { label: t('nav.home'), href: '#inicio' },
  { label: t('nav.projects'), href: '#projetos' },
  { label: t('nav.skills'), href: '#habilidades' },
  { label: t('nav.hackathons'), href: '#hackathons' },
  { label: t('nav.about'), href: '#sobre' },
  { label: t('nav.contact'), href: '#contato' }
];

const smoothScrollTo = (elementId: string) => {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const socialLinks = getSocialLinks(t);

  return (
    <footer id="contato" className="relative bg-card border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-10 md:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="mb-3 sm:mb-4">
                  <Heading level={3} className="gradient-text text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                    Samuel Stefano Teixeira do Carmo
                  </Heading>
                </div>
              <Text className="mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('footer.description')}
              </Text>
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                <Icon icon={Code} size="sm" className="text-primary" />
                <Text variant="small">{t('footer.location')}</Text>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover-glow border-border bg-background/50 hover:bg-primary hover:text-primary-foreground touch-manipulation transition-all duration-300 hover:scale-105"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <Icon icon={link.icon} size="sm" className="w-4 h-4" />
                    <span className="sm:hidden text-xs font-medium">{link.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="order-last sm:order-none">
            <Heading level={4} className="mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base md:text-lg lg:text-xl">
              {t('footer.quickLinks')}
            </Heading>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
              {getQuickLinks(t).map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => smoothScrollTo(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left text-xs sm:text-sm md:text-base touch-manipulation py-1 sm:py-1.5 md:py-2"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-last sm:order-none">
            <Heading level={4} className="mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base md:text-lg lg:text-xl">
              {t('footer.contact')}
            </Heading>
            <ul className="space-y-3 sm:space-y-3.5 md:space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 touch-manipulation py-1 sm:py-1.5 md:py-2"
                  >
                    <Icon icon={contact.icon} size="sm" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <Text variant="small" className="text-xs sm:text-sm md:text-base whitespace-nowrap">{contact.label}</Text>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 sm:mt-5 md:mt-6 p-3 sm:p-4 md:p-5 bg-muted/20 rounded-lg">
              <Heading level={5} className="mb-2 sm:mb-2.5 md:mb-3 text-sm sm:text-base md:text-lg">
                {t('footer.availableFor')}
              </Heading>
              <ul className="text-xs sm:text-sm md:text-base text-muted-foreground space-y-1 sm:space-y-1.5">
                <li>{t('footer.freelanceProjects')}</li>
                <li>{t('footer.fulltimeOpportunities')}</li>
                <li>{t('footer.collaborations')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-4 sm:py-5 md:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base text-muted-foreground text-center sm:text-left">
              <Text variant="small">© {currentYear} Samuel Stefano. {t('footer.madeWith')} muito esforço e com muito</Text>
              <Icon icon={Code} size="sm" className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base text-muted-foreground text-center sm:text-right">
              <Text variant="small">Desenvolvido com React, TypeScript e Supabase</Text>
              <div className="flex gap-2 sm:gap-2.5">
                <span className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded text-xs sm:text-sm font-medium">
                  Open Source
                </span>
                <span className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-neon-green/10 text-neon-green rounded text-xs sm:text-sm font-medium">
                  Responsivo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



