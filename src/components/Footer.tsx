import { Github, Linkedin, Instagram, Mail, Phone, Heart, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/SamuelStefano',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/samuel-stefano',
      label: 'LinkedIn'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/samuel.stefano',
      label: 'Instagram'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'samuel@example.com',
      href: 'mailto:samuel@example.com'
    },
    {
      icon: Phone,
      label: '+55 (44) 9 9879-5387',
      href: 'tel:+5544998795387'
    }
  ];

  const quickLinks = [
    { label: 'Projetos', href: '#projetos' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Samuel Stefano
              </h3>
              <p className="text-muted-foreground mb-4">
                Desenvolvedor Full-Stack apaixonado por criar soluções digitais 
                inovadoras e funcionais. Sempre em busca de novos desafios e 
                oportunidades de aprendizado.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code className="w-4 h-4 text-primary" />
                <span>Marialva, PR • Brasil</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover-glow border-border bg-background/50 hover:bg-primary hover:text-primary-foreground"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index}>
                    <a
                      href={contact.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{contact.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Additional Info */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <h5 className="font-medium text-foreground mb-2">
                Disponível para
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Projetos freelance</li>
                <li>• Oportunidades full-time</li>
                <li>• Colaborações</li>
                <li>• Mentoria técnica</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>© {currentYear} Samuel Stefano. Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>e muito</span>
              <Code className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Desenvolvido com React & TypeScript</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  Open Source
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
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