import { useEffect } from 'react';
import Header from '@/components/Header';
import ProjectCarousel from '@/components/ProjectCarousel';
import ProjectGrid from '@/components/ProjectGrid';
import TechStack from '@/components/TechStack';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title and meta description for SEO
    document.title = 'Samuel Stefano - Full-Stack Developer | Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio de Samuel Stefano, desenvolvedor full-stack especializado em React, TypeScript, Node.js. Projetos modernos e soluções digitais inovadoras.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Samuel Stefano Teixeira do Carmo",
      "jobTitle": "Full-Stack Developer",
      "description": "Desenvolvedor Full-Stack especializado em React, TypeScript, Node.js",
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
    <main className="min-h-screen bg-background">
      {/* Header/Hero Section */}
      <Header />
      
      {/* Projects Carousel */}
      <section id="projetos">
        <ProjectCarousel />
      </section>
      
      {/* Projects Grid */}
      <ProjectGrid />
      
      {/* Tech Stack & Experience */}
      <section id="habilidades">
        <TechStack />
      </section>
      
      {/* About Section */}
      <section id="sobre">
        <About />
      </section>
      
      {/* Footer */}
      <section id="contato">
        <Footer />
      </section>
    </main>
  );
};

export default Index;
