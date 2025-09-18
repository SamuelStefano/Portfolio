import { Github, Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { SocialLink } from '@/components/molecules/SocialLink';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { useUser } from '@/hooks/useUser';

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

export const Header = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p>Carregando...</p>;

  return (
    <header className="relative w-full py-20 px-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto mt-14">
        <div className="mb-8 animate-slide-up">
          <Heading level={1} className="mb-4 font-inter">
            <span className="gradient-text">{user?.name || 'Samuel Stefano'}</span>
          </Heading>
          <Text variant="large" className="font-medium tracking-wide">
            Full-Stack Developer
          </Text>
          <Text className="mt-2 opacity-80">
            Desenvolvedor Júnior • ADS 3º ano • Marialva, PR
          </Text>
        </div>

        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Text variant="large" className="max-w-2xl mx-auto leading-relaxed">
            Especializado em React, TypeScript e Node.js. 
            <br className="hidden md:block" />
            Criando experiências digitais modernas e funcionais.
          </Text>
        </div>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }} >
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              icon={link.icon}
              href={link.href}
              label={link.label}
            />
          ))}
        </div>

        <div className="mt-32 mb-8 relative z-20 animate-float hover-smooth-scale" style={{ animationDelay: '0.6s' }}>
          <div className="w-[400px] h-[400px] mx-auto rounded-full overflow-hidden border-4 border-primary/30 hover:border-primary/60 transition-all duration-500 hover-glow bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center group">
            {user?.photo_url ? (
              <img 
                src={user.photo_url} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-primary">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'SS'}
              </span>
            )}
          </div>
        </div>

        <div className="mt-12 animate-slide-up relative z-10" style={{ animationDelay: '0.8s' }}>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center mx-auto animate-float">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
