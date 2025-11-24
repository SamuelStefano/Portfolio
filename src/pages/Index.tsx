import { useEffect } from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel/ProjectCarousel';
import { ProjectGrid } from '@/components/organisms/ProjectGrid/ProjectGrid';
import { TechStack } from '@/components/organisms/TechStack/TechStack';
import { HackathonsSection } from '@/components/organisms/HackathonsSection/HackathonsSection';
import { About } from '@/components/organisms/About/About';
import { Footer } from '@/components/organisms/Footer/Footer';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground/AnimatedBackground';

const Index = () => {
  useEffect(() => {
    // Fazer fetch apenas uma vez na montagem da página
    fetch('/api/loc')
      .then(response => response.json())
      .then(data => {
        // Dados são salvos automaticamente no servidor
        // Não fazemos nada no front-end, apenas silenciosamente
      })
      .catch(error => {
        // Erro silencioso, não mostra nada no UI
        console.error('Error fetching location:', error);
      });
  }, []); // Array vazio = executa apenas uma vez na montagem

  return (
    <main className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <section id="projetos">
            <ProjectCarousel />
          </section>
          <ProjectGrid />
          <section id="habilidades">
            <TechStack />
          </section>
          <section id="hackathons">
            <HackathonsSection />
          </section>
          <section id="sobre">
            <About />
          </section>
          <section id="contato">
            <Footer />
          </section>
        </div>
      </main>
  );
};

export default Index;



