import { Header } from '@/components/organisms/Header';
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel';
import { ProjectGrid } from '@/components/organisms/ProjectGrid';
import { TechStack } from '@/components/organisms/TechStack';
import { HackathonsSection } from '@/components/organisms/HackathonsSection';
import { About } from '@/components/organisms/About';
import { Footer } from '@/components/organisms/Footer';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground';

const Index = () => {
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
