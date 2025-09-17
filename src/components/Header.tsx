import { Github, Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/samuel-profile.jpg';

const Header = () => {
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
      icon: Mail,
      href: 'mailto:samuel@example.com',
      label: 'Email'
    },
    {
      icon: Phone,
      href: 'tel:+5544998795387',
      label: 'Telefone'
    }
  ];

  return (
    <header className="relative w-full py-20 px-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Name & Title */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 font-inter">
            <span className="gradient-text">Samuel Stefano</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium tracking-wide">
            Full-Stack Developer
          </p>
          <p className="text-base md:text-lg text-muted-foreground mt-2 opacity-80">
            Desenvolvedor Júnior • ADS 3º ano • Marialva, PR
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Especializado em React, TypeScript e Node.js. 
            <br className="hidden md:block" />
            Criando experiências digitais modernas e funcionais.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="lg"
                asChild
                className="hover-glow border-border bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                <a 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {link.label}
                </a>
              </Button>
            );
          })}
        </div>

        {/* Profile Photo */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/30 hover:border-primary/60 transition-all duration-300 hover-glow">
            <img 
              src={profileImage} 
              alt="Samuel Stefano - Foto de perfil" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;