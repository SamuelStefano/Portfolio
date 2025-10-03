import { Header } from '@/components/organisms/Header';
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel';
import { ProjectGrid } from '@/components/organisms/ProjectGrid';
import { TechStack } from '@/components/organisms/TechStack';
import { About } from '@/components/organisms/About';
import { Footer } from '@/components/organisms/Footer';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground';
import { SEOHead } from '@/components/atoms/SEOHead';

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Samuel Stefano - Full-Stack Developer | Portfolio"
        description="Meu portfólio como desenvolvedor Full-Stack 🚀 Especializado em React, TypeScript, Node.js, Nest, Tailwind. Projetos modernos e soluções digitais inovadoras."
        image="https://samuelstefano.dev/aheadprincipal.png"
        url="https://samuelstefano.dev"
      />
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
          <section id="sobre">
            <About />
          </section>
          <section id="contato">
            <Footer />
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;
