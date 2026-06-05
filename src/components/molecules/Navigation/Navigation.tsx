import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/button/button';
import { Text } from '@/components/atoms/Text/Text';
import { LanguageSelector } from '@/components/molecules/LanguageSelector/LanguageSelector';
import { ColorSchemeSelector } from '@/components/molecules/ColorSchemeSelector/ColorSchemeSelector';
import { SkinToggle } from '@/components/molecules/SkinToggle/SkinToggle';
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle';
import { useSkin } from '@/hooks/useSkin';

const smoothScrollTo = (elementId: string) => {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const Navigation = () => {
  const { t } = useTranslation();
  const { skin } = useSkin();
  const isCli = skin === 'cli';
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { label: t('nav.home'), href: '#inicio' },
    { label: t('nav.focus'), href: '#foco' },
    { label: t('nav.projects'), href: '#projetos' },
    { label: t('nav.skills'), href: '#habilidades' },
    { label: t('nav.experience'), href: '#experiencia' },
    { label: t('nav.companies'), href: '#empresas' },
    { label: t('nav.hackathons'), href: '#hackathons' },
    { label: t('nav.about'), href: '#sobre' },
    { label: t('nav.contact'), href: '#contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);

      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      smoothScrollTo(href);
    }
    setIsOpen(false);
  };

  if (isCli) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--cli-border)] bg-[var(--cli-panel)]/90 font-mono backdrop-blur-md">
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => handleNavClick('#inicio')}
            className="flex items-center gap-2 text-sm sm:text-[15px]"
          >
            <span className="text-[var(--cli-green)]">samuel@stefano</span>
            <span className="text-[var(--cli-text-dim)]">:</span>
            <span className="text-[var(--cli-cyan)]">~</span>
            <span className="text-[var(--cli-text-dim)]">$</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-2.5 py-1.5 text-[13px] xl:text-sm transition-colors duration-200 ${
                  activeSection === item.href
                    ? 'text-[var(--cli-cyan)]'
                    : 'text-[var(--cli-text-soft)] hover:text-[var(--cli-green)]'
                }`}
              >
                <span className="text-[var(--cli-text-dim)]">./</span>{item.label}
              </button>
            ))}

            <div className="ml-3 xl:ml-4 flex items-center gap-2">
              <SkinToggle />
              <ColorSchemeSelector />
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <SkinToggle />
            <ColorSchemeSelector />
            <ThemeToggle />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[var(--cli-text-soft)] hover:text-[var(--cli-green)]"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-[var(--cli-border)] bg-[var(--cli-panel)]/98 backdrop-blur-md">
            <div className="px-4 py-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2.5 text-sm transition-colors duration-200 ${
                    activeSection === item.href
                      ? 'text-[var(--cli-cyan)]'
                      : 'text-[var(--cli-text-soft)] hover:text-[var(--cli-green)]'
                  }`}
                >
                  <span className="text-[var(--cli-text-dim)]">./</span>{item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg'
        : 'bg-transparent backdrop-blur-none border-b-0 shadow-none'
    }`}>
      <div className="relative flex items-center justify-between h-16 sm:h-18 md:h-20 px-4 sm:px-6 lg:px-8">
          {/* LEFT: logo + SkinToggle */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative">
              <img
                src="/EuGhibli.png"
                alt="Samuel Stefano"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <Text className={`font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl transition-colors duration-300 leading-tight ${
                isScrolled ? 'gradient-text' : 'text-white drop-shadow-lg'
              }`}>
                Samuel Stefano
              </Text>
              <Text className={`text-xs sm:text-sm md:text-base transition-colors duration-300 ${
                isScrolled ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                Full-Stack Developer
              </Text>
            </div>
            <div className="hidden lg:flex ml-2">
              <SkinToggle />
            </div>
          </div>

          {/* CENTER: nav links — absolutely centered at xl, static flex at lg */}
          <div className="hidden lg:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2 items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm xl:text-base font-medium transition-colors duration-200 px-3 py-2 rounded-lg whitespace-nowrap ${
                  activeSection === item.href
                    ? 'text-primary bg-primary/10'
                    : isScrolled
                      ? 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT: remaining controls (desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <ColorSchemeSelector />
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile: controls + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <SkinToggle />
            <ColorSchemeSelector />
            <ThemeToggle />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-200 p-2 ${
                isScrolled
                  ? 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className={`lg:hidden transition-all duration-300 ${
            isScrolled
              ? 'border-t border-border/50 bg-background/98 backdrop-blur-md'
              : 'border-t border-white/20 bg-background/95 backdrop-blur-md'
          }`}>
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === item.href
                      ? 'text-primary bg-primary/15 border border-primary/30'
                      : isScrolled
                        ? 'text-foreground hover:text-primary hover:bg-primary/5'
                        : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navigation;



