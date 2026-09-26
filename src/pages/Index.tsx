import { useState } from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { SnakeGame } from '@/components/atoms/SnakeGame/SnakeGame';
import { ProjectGrid } from '@/components/organisms/ProjectGrid/ProjectGrid';
import { Experience } from '@/components/organisms/Experience/Experience';
import { TechStack } from '@/components/organisms/TechStack/TechStack';
import { HackathonsSection } from '@/components/organisms/HackathonsSection/HackathonsSection';
import { About } from '@/components/organisms/About/About';
import { Footer } from '@/components/organisms/Footer/Footer';
import { CliMode } from '@/components/organisms/CliMode/CliMode';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { LogButton } from '@/components/molecules/LogButton/LogButton';
import { BackToTop } from '@/components/atoms/BackToTop/BackToTop';
import { useSkin } from '@/hooks/useSkin';

const Index = () => {
  const { skin } = useSkin();
  const isCli = skin === 'cli';
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
        {isCli ? (
          <div className="relative z-10">
            <Navigation />
            <CliMode />
          </div>
        ) : (
          <div className="relative z-10">
            <Header />
            <ProjectGrid />
            <Experience />
            <TechStack />
            <HackathonsSection />
            <About />
            <Footer onOpenGame={() => setGameOpen(true)} />
          </div>
        )}
        <LogButton />
        <BackToTop />
        {gameOpen && <SnakeGame onClose={() => setGameOpen(false)} />}
      </main>
  );
};

export default Index;
