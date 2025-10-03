'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Samuel Stefano - Full-Stack Developer | Portfolio',
  description = 'Meu portfólio como desenvolvedor Full-Stack 🚀 Especializado em React, TypeScript, Node.js, Nest, Tailwind. Projetos modernos e soluções digitais inovadoras.',
  image = 'https://samuelstefano.dev/aheadprincipal.png',
  url = 'https://samuelstefano.dev',
  type = 'website'
}) => {
  useEffect(() => {
    // Atualizar título da página
    document.title = title;

    // Atualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Atualizar Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Atualizar Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Open Graph
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);

    // Twitter
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:image', image);
    updateTwitterTag('twitter:url', url);

    // Structured Data para SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Samuel Stefano Teixeira do Carmo",
      "jobTitle": "Full-Stack Developer",
      "description": description,
      "url": url,
      "image": image,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Marialva",
        "addressRegion": "PR",
        "addressCountry": "BR"
      },
      "sameAs": [
        "https://github.com/SamuelStefano",
        "https://linkedin.com/in/samuel-stefano",
        "https://instagram.com/samuel.stefano"
      ],
      "knowsAbout": [
        "React",
        "TypeScript",
        "Node.js",
        "NestJS",
        "Tailwind CSS",
        "Full-Stack Development",
        "Web Development"
      ]
    };

    // Remover structured data anterior se existir
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Adicionar novo structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, image, url, type]);

  return null;
};
