import { useState } from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { SnakeGame } from '@/components/atoms/SnakeGame/SnakeGame';
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel/ProjectCarousel';
import { ProjectGrid } from '@/components/organisms/ProjectGrid/ProjectGrid';
import { TechStack } from '@/components/organisms/TechStack/TechStack';
import { HackathonsSection } from '@/components/organisms/HackathonsSection/HackathonsSection';
import { FocusSection } from '@/components/organisms/FocusSection/FocusSection';
import { About } from '@/components/organisms/About/About';
import { Footer } from '@/components/organisms/Footer/Footer';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground/AnimatedBackground';
import { ConstellationBackground } from '@/components/atoms/ConstellationBackground/ConstellationBackground';
import { CliMode } from '@/components/organisms/CliMode/CliMode';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { LogButton } from '@/components/molecules/LogButton/LogButton';
import { ScrollProgress } from '@/components/atoms/ScrollProgress/ScrollProgress';
import { CustomCursor } from '@/components/atoms/CustomCursor/CustomCursor';
import { BackToTop } from '@/components/atoms/BackToTop/BackToTop';
import { useSkin } from '@/hooks/useSkin';
import { useOffscreenAnimationPause } from '@/hooks/useOffscreenAnimationPause';

const Index = () => {
  const { skin } = useSkin();
  const isCli = skin === 'cli';
  const [gameOpen, setGameOpen] = useState(false);

  useOffscreenAnimationPause();

  return (
    <main className="min-h-screen relative cursor-none">
        <CustomCursor />
        <ScrollProgress />
        {!isCli && <AnimatedBackground />}
        {!isCli && <ConstellationBackground />}
        {isCli ? (
          <div className="relative z-10">
            <Navigation />
            <CliMode />
          </div>
        ) : (
          <div className="relative z-10">
            <Header />
            <section id="foco">
              <FocusSection />
            </section>
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
        )}
        <LogButton />
        <BackToTop />

        <button
          type="button"
          onClick={() => setGameOpen(true)}
          title="🐍 Snake"
          aria-label="Easter egg: Snake game"
          className="group fixed bottom-4 left-4 z-50 flex h-11 items-center gap-2 rounded-full border border-[#ffb854]/40 bg-background/90 px-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#ffb854]/70"
        >
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#ffb854]/50" />
            <span className="relative h-2 w-2 rounded-full bg-[#ffb854] shadow-[0_0_8px_2px_rgba(255,184,84,0.6)]" />
          </span>
          <span className="font-mono text-xs text-[#ffb854]">snake</span>
        </button>
        {gameOpen && <SnakeGame onClose={() => setGameOpen(false)} />}
      </main>
  );
};

export default Index;



