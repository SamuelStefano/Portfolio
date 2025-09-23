import { Github, Linkedin, Instagram, Mail, Phone, Heart, Code, FileText, Brain } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

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
  },
  {
    icon: FileText,
    href: 'https://drive.google.com/file/d/1-TpoRcofaK4T-rZZFWouQctZhW4Q9kpp/view?usp=sharing',
    label: 'Currículo'
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

const quickLinks = [
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

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="relative bg-card border-t border-border">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Heading level={3} className="gradient-text">
                    Samuel Stefano Teixeira do Carmo
                  </Heading>
                </div>
              <Text className="mb-4">
                Desenvolvedor Full-Stack apaixonado por criar soluções digitais 
                inovadoras e funcionais. Sempre em busca de novos desafios e 
                oportunidades de aprendizado.
              </Text>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon icon={Code} size="sm" className="text-primary" />
                <Text variant="small">Marialva, PR • Brasil</Text>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
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
                    <Icon icon={link.icon} size="sm" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Heading level={4} className="mb-4">
              Navegação
            </Heading>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => smoothScrollTo(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <Heading level={4} className="mb-4">
              Contato
            </Heading>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon icon={contact.icon} size="sm" />
                    <Text variant="small">{contact.label}</Text>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Additional Info */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <Heading level={5} className="mb-2">
                Disponível para
              </Heading>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Projetos freelance</li>
                <li>• Oportunidades full-time</li>
                <li>• Colaborações</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Text variant="small">© {currentYear} Samuel Stefano. Feito com muito esforço e com muito</Text>
              <Icon icon={Code} size="md" className="text-primary" />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Text variant="small">Desenvolvido com React, TypeScript e Supabase</Text>
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
