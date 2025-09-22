import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/Text';

const navigationItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' }
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

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Detecta se saiu do hero (início da página)
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
    smoothScrollTo(href);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
        : 'bg-transparent backdrop-blur-none border-b-0 shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/EuGhibli.png" 
              alt="Samuel Stefano" 
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
            />
            <Text className={`font-bold text-lg transition-colors duration-300 ${
              isScrolled ? 'gradient-text' : 'text-white'
            }`}>
              Samuel Stefano
            </Text>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href
                    ? 'text-primary'
                    : isScrolled 
                      ? 'text-muted-foreground hover:text-primary'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-200 ${
                isScrolled 
                  ? 'text-muted-foreground hover:text-primary'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden transition-all duration-300 ${
            isScrolled 
              ? 'border-t border-border/50 bg-background/95 backdrop-blur-md'
              : 'border-t border-primary-foreground/20 bg-background/90 backdrop-blur-md'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeSection === item.href
                      ? 'text-primary bg-primary/10'
                      : isScrolled
                        ? 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
