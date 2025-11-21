import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/atoms/button/button';

interface ImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
  onImageClick?: (imageUrl: string) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = React.memo(({
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

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isHovering) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Aumentado para 5000ms para reduzir mudanças frequentes
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length, isHovering, currentIndex]);

  const openModal = useCallback((imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalImage('');
  }, []);

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
        <div className="relative overflow-hidden rounded-xl bg-card border border-border" style={{ willChange: 'transform' }}>
          <div className="relative w-[100%] h-[50%]">
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${title} - Imagem ${currentIndex + 1}`}
              className="w-full h-full object-contain cursor-pointer transition-opacity duration-100"
              onClick={() => {
                if (onImageClick) {
                  onImageClick(images[currentIndex]);
                } else {
                  openModal(images[currentIndex]);
                }
              }}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-150 flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-150">
                <div className="bg-white/20 rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

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

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto overflow-y-hidden">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                     className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-100 ${
                      index === currentIndex
                        ? 'border-primary'
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
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
          </div>
        </div>
      )}
    </>
  );
});



