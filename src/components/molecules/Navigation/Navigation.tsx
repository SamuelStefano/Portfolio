import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/button/button';
import { LanguageSelector } from '@/components/molecules/LanguageSelector/LanguageSelector';
import { ColorSchemeSelector } from '@/components/molecules/ColorSchemeSelector/ColorSchemeSelector';
import { SkinToggle } from '@/components/molecules/SkinToggle/SkinToggle';
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle';
import { useSkin } from '@/hooks/useSkin';

const NAV_ITEMS = [
  { labelKey: 'nav.projects', href: '#projetos' },
  { labelKey: 'nav.experience', href: '#experiencia' },
  { labelKey: 'nav.skills', href: '#habilidades' },
  { labelKey: 'nav.hackathons', href: '#hackathons' },
  { labelKey: 'nav.about', href: '#sobre' },
  { labelKey: 'nav.contact', href: '#contato' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.substring(1));

const smoothScrollTo = (elementId: string) => {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({ block: 'start' });
  }
};

export const Navigation = () => {
  const { t } = useTranslation();
  const { skin } = useSkin();
  const isCli = skin === 'cli';
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = NAV_ITEMS.map((item) => ({ label: t(item.labelKey), href: item.href }));

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 50);

      const scrollPosition = scrollY + 100;
      let current = '';

      for (const section of SECTION_IDS) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = `#${section}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
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

          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              className="p-2 text-[var(--cli-text-soft)] hover:text-[var(--cli-green)]"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-nav" className="lg:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-[var(--cli-border)] bg-[var(--cli-panel)]/98 backdrop-blur-md">
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
            <div className="flex flex-wrap items-center gap-2 border-t border-[var(--cli-border)] px-4 py-4">
              <SkinToggle />
              <ColorSchemeSelector />
              <LanguageSelector />
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md border-border/60' : 'bg-background/0 border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-16 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            className="flex min-w-0 items-center gap-2.5"
            aria-label="Samuel Stefano"
          >
            <img
              src="/EuGhibli.png"
              alt=""
              className="h-8 w-8 shrink-0 rounded-full border border-border object-cover"
            />
            <span className="whitespace-nowrap text-sm font-semibold text-foreground sm:text-base">Samuel Stefano</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  activeSection === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <SkinToggle />
            <ColorSchemeSelector />
            <ThemeToggle />
            <LanguageSelector prominent />
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-nav" className="lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/50 bg-background">
            <div className="px-4 py-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-4 py-2.5 text-base font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === item.href
                      ? 'text-primary bg-primary/15 border border-primary/30'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-border/50 px-4 py-4">
              <SkinToggle />
              <ColorSchemeSelector />
              <LanguageSelector />
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navigation;



