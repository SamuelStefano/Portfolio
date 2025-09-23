import { useEffect } from 'react';
import { Header } from '@/components/organisms/Header';
import { ProjectCarousel } from '@/components/organisms/ProjectCarousel';
import { ProjectGrid } from '@/components/organisms/ProjectGrid';
import { TechStack } from '@/components/organisms/TechStack';
import { About } from '@/components/organisms/About';
import { Footer } from '@/components/organisms/Footer';
import { AnimatedBackground } from '@/components/atoms/AnimatedBackground';

const Index = () => {
  useEffect(() => {
    document.title = 'Samuel Stefano - Full-Stack Developer | Portfolio';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio de Samuel Stefano, desenvolvedor full-stack especializado em React, TypeScript, Node.js, Nest, Tailwind. Projetos modernos e soluções digitais inovadoras.');
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Samuel Stefano Teixeira do Carmo",
      "jobTitle": "Full-Stack Developer",
      "description": "Desenvolvedor Full-Stack especializado em React, TypeScript, Node.js, Nest, Tailwind. Projetos modernos e soluções digitais inovadoras.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Marialva",
        "addressRegion": "PR",
        "addressCountry": "BR"
      },
      "url": window.location.href,
      "sameAs": [
        "https://github.com/SamuelStefano",
        "https://linkedin.com/in/samuel-stefano",
        "https://instagram.com/samuel.stefano"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
