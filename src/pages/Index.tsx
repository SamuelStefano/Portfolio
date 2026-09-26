import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/organisms/Header/Header';
import { ProjectGrid } from '@/components/organisms/ProjectGrid/ProjectGrid';
import { TechStack } from '@/components/organisms/TechStack/TechStack';
import { HackathonsSection } from '@/components/organisms/HackathonsSection/HackathonsSection';
import { About } from '@/components/organisms/About/About';
import { Footer } from '@/components/organisms/Footer/Footer';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground/AnimatedBackground';
import { Navigation } from '@/components/molecules/Navigation/Navigation';
import { LogButton } from '@/components/molecules/LogButton/LogButton';
import { BackToTop } from '@/components/atoms/BackToTop/BackToTop';
import { ProjectOverlayProvider } from '@/components/organisms/ProjectOverlay/ProjectOverlayProvider';
import { useSkin } from '@/hooks/useSkin';
import { useOffscreenAnimationPause } from '@/hooks/useOffscreenAnimationPause';

// Only a few visitors switch to the terminal skin or open the snake; neither ships in the main bundle.
const CliMode = lazy(() => import('@/components/organisms/CliMode/CliMode'));
const SnakeGame = lazy(() => import('@/components/atoms/SnakeGame/SnakeGame'));

const Index = () => {
  const { t } = useTranslation();
  const { skin } = useSkin();
  const isCli = skin === 'cli';
  const [gameOpen, setGameOpen] = useState(false);

  useOffscreenAnimationPause();

  return (
    <ProjectOverlayProvider>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {t('controls.skipToContent')}
      </a>
      <main className="min-h-screen relative">
        {!isCli && <AnimatedBackground />}
        {isCli ? (
          <div className="relative z-10">
            <Navigation />
            <Suspense fallback={<div className="min-h-screen" />}>
              <CliMode />
            </Suspense>
          </div>
        ) : (
          <div className="relative z-10">
            <Header />
            <ProjectGrid />
            <TechStack />
            <HackathonsSection />
            <About />
            <Footer onOpenGame={() => setGameOpen(true)} />
          </div>
        )}
        <LogButton />
        <BackToTop />
        {gameOpen && (
          <Suspense fallback={null}>
            <SnakeGame onClose={() => setGameOpen(false)} />
          </Suspense>
        )}
      </main>
    </ProjectOverlayProvider>
  );
};

export default Index;
