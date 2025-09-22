import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/atoms/button';

interface ImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
  onImageClick?: (imageUrl: string) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  title, 
  className = "",
  onImageClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Autoplay 5s (pausa no hover e quando não há múltiplas imagens)
  useEffect(() => {
    if (images.length <= 1) return;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isHovering) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length, isHovering, currentIndex]);

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  if (images.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">Nenhuma imagem encontrada</p>
      </div>
    );
  }

  return (
    <>
      <div 
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Carrossel Container */}
        <div className="relative overflow-hidden rounded-xl bg-card border border-border">
          {/* Imagem Atual */}
          <div className="relative w-[100%] h-[50%]">
            {/* 🖼️ TAMANHO CARROSSEL: aspect-video (16:9) - mude para aspect-square, aspect-[4/3], aspect-[3/2], etc. */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${title} - Imagem ${currentIndex + 1}`}
                className="w-full h-full object-contain cursor-pointer"
                transition={{ duration: 0.3 }}
                onClick={() => {
                  console.log('🖼️ Clique na imagem:', images[currentIndex], 'onImageClick:', !!onImageClick);
                  if (onImageClick) {
                    onImageClick(images[currentIndex]);
                  } else {
                    openModal(images[currentIndex]);
                  }
                }}
                loading="lazy"
              />
            </AnimatePresence>

            {/* Overlay com botão de zoom */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Botões de navegação */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Indicador de posição */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {images.length > 0 && (
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto overflow-y-hidden">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative flex-shrink-0 h-[10vh] w-[15vh] mx-10 rounded-lg overflow-hidden  transition-all duration-200 ${
                      // 🖼️ TAMANHO MINIATURAS: w-16 h-12 - mude para w-20 h-14, w-12 h-8, etc.
                      index === currentIndex
                        ? 'border-primary scale-105'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de visualização */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalImage}
                alt="Imagem em tela cheia"
                className="w-full h-full object-contain rounded-lg"
                loading="lazy"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
