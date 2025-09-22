import { Github, Linkedin, Instagram, Mail, Phone, FileText } from 'lucide-react';
import { SocialLink } from '@/components/molecules/SocialLink';
import { Navigation } from '@/components/molecules/Navigation';
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

  return (
    <>
      <Navigation />
      <header id="inicio" className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
      
      {/* Elementos de fundo proporcionais à tela */}
      <div className="absolute top-[10vh] left-[5vw] w-[20vw] h-[20vw] min-w-[200px] min-h-[200px] max-w-[400px] max-h-[400px] bg-neon-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[10vh] right-[5vw] w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] max-w-[500px] max-h-[500px] bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 text-center w-full max-w-[90vw] px-4">
        <div className="mb-[4vh] animate-slide-up">
          <Heading level={1} className="mb-[2vh] font-inter text-[4vw] sm:text-[3.5vw] lg:text-[3vw] xl:text-[2.5vw] 2xl:text-[2vw]">
            <span className="gradient-text">Samuel Stefano</span>
          </Heading>
          <Text variant="large" className="font-medium tracking-wide text-[2vw] sm:text-[1.8vw] lg:text-[1.5vw] xl:text-[1.2vw] 2xl:text-[1vw]">
            Full-Stack Developer
          </Text>
          <Text className="mt-[1vh] opacity-80 text-[1.2vw] sm:text-[1vw] lg:text-[0.9vw] xl:text-[0.8vw] 2xl:text-[0.7vw]">
            Desenvolvedor Júnior • ADS 3º ano • Marialva, PR
          </Text>
        </div>

        <div className="mb-[6vh] animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Text variant="large" className="max-w-[60vw] mx-auto leading-relaxed text-[1.2vw] sm:text-[1vw] lg:text-[0.9vw] xl:text-[0.8vw] 2xl:text-[0.7vw]">
            Especializado em React, TypeScript e Node.js, Nest, Tailwind, APIs. 
            <br className="hidden sm:block" />
            Criando experiências digitais modernas e funcionais.
          </Text>
        </div>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-up " style={{ animationDelay: '0.4s' }} >
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              icon={link.icon}
              href={link.href}
              label={link.label}
            />
          ))}
        </div>

        <div className="mt-[8vh] mb-[4vh] relative z-20 animate-float hover-smooth-scale" style={{ animationDelay: '0.6s' }}>
          <div className="w-[40vh] h-[40vh] min-w-[150px] min-h-[150px] max-w-[50vh] max-h-[50vh] hover:scale-105 mx-auto rounded-full overflow-hidden border-[0.3vh] border-primary/30 hover:border-primary/60 transition-all duration-500 hover-glow bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center group">
            <img 
              src="https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/imagem%20profissional.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9pbWFnZW0gcHJvZmlzc2lvbmFsLmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.IobSgu4JA84a7JH4l_SRZxkZZ8qCpS7oQ4PfwhlEut0" 
              alt="Samuel Stefano"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="animate-slide-up relative z-10" style={{ animationDelay: '0.8s' }}>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center mx-auto animate-float">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
