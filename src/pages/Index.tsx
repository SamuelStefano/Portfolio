import { useEffect, useState } from 'react';
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

const Index = () => {
  const { skin } = useSkin();
  const isCli = skin === 'cli';
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => {
    // Tentar obter localização GPS exata primeiro
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Localização GPS exata obtida
          const { latitude, longitude } = position.coords;
          const accuracy = position.coords.accuracy; // Precisão em metros
          
          // Enviar localização GPS exata para a API
          fetch('/api/loc', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lat: latitude,
              lon: longitude,
              accuracy: accuracy,
              source: 'gps'
            })
          }).catch(error => {
            console.error('Error sending GPS location:', error);
          });
        },
        (error) => {
          // Usuário negou permissão ou erro na geolocalização
          // Fallback: usar localização por IP
          fetch('/api/loc')
            .then(response => response.json())
            .then(data => {
              // Dados são salvos automaticamente no servidor
            })
            .catch(err => {
              console.error('Error fetching location by IP:', err);
            });
        },
        {
          enableHighAccuracy: true, // Tentar obter a localização mais precisa possível
          timeout: 10000, // Timeout de 10 segundos
          maximumAge: 0 // Não usar cache, sempre obter nova localização
        }
      );
    } else {
      // Geolocalização não disponível, usar apenas IP
      fetch('/api/loc')
        .then(response => response.json())
        .then(data => {
          // Dados são salvos automaticamente no servidor
        })
        .catch(error => {
          console.error('Error fetching location:', error);
        });
    }
  }, []); // Array vazio = executa apenas uma vez na montagem

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



