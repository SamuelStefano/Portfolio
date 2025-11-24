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



