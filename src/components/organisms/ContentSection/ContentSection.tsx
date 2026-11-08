import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { CountUp } from '@/components/atoms/CountUp/CountUp';
import { ChunkBoundary } from '@/components/atoms/ChunkBoundary/ChunkBoundary';
import { ContentCard } from '@/components/molecules/ContentCard/ContentCard';
import { CONTENT_METRICS_DATE, CONTENT_POSTS, CONTENT_TOTAL_VIEWS, type ContentPost } from '@/consts/content';
import { formatContentDate } from '@/lib/contentCredits';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { cn } from '@/lib/utils';

// The player only loads when a visitor opens a post.
const ContentModal = lazy(() => import('./ContentModal'));

const PROFILES = new Set(CONTENT_POSTS.map((p) => p.account)).size;
const EDGE_TOLERANCE = 8;

export const ContentSection = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.language || 'pt').slice(0, 2);
  const { containerRef } = useScrollAnimations();
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // stays mounted after the first open so the dialog can play its closing animation
  const [modalMounted, setModalMounted] = useState(false);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= EDGE_TOLERANCE,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_TOLERANCE,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: 'smooth' });
  };

  const openPost = (post: ContentPost) => {
    setModalMounted(true);
    setOpenIndex(CONTENT_POSTS.indexOf(post));
  };

  const stats = [
    { value: CONTENT_POSTS.length, label: t('content.stats.posts') },
    { value: CONTENT_TOTAL_VIEWS, label: t('content.stats.views') },
    { value: PROFILES, label: t('content.stats.profiles') },
  ];

  return (
    <section id="conteudo" className="relative overflow-hidden py-16 sm:py-20 lg:py-24" ref={containerRef}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500/15 via-pink-500/15 to-purple-600/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl animate-fade-up">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-500">
              <Instagram className="h-3.5 w-3.5" />
              {t('content.eyebrow')}
            </span>
            <Heading level={2} className="mb-3 gradient-text text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
              {t('content.title')}
            </Heading>
            <Text variant="large" className="text-sm text-muted-foreground sm:text-base md:text-lg">
              {t('content.subtitle')}
            </Text>
          </div>

          <div className="flex items-end gap-6 animate-fade-up sm:gap-10" style={{ animationDelay: '0.15s' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <CountUp value={stat.value} className="block text-2xl font-black tabular-nums sm:text-3xl" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={updateEdges}
          className={cn(
            'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-8 pt-3 sm:gap-5',
            'scroll-px-4 px-4 sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {CONTENT_POSTS.map((post, index) => (
            <div key={post.slug} className="animate-fade-up" style={{ animationDelay: `${Math.min(index, 5) * 0.08}s` }}>
              <ContentCard post={post} onOpen={openPost} />
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent transition-opacity sm:w-20',
            edges.start ? 'opacity-0' : 'opacity-100',
          )}
        />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent transition-opacity sm:w-20',
            edges.end ? 'opacity-0' : 'opacity-100',
          )}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-muted-foreground">
          <p className="hidden sm:block">{t('content.scrollHint')}</p>
          <p>{t('content.metricsNote', { date: formatContentDate(CONTENT_METRICS_DATE, language) })}</p>
        </div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollByPage(direction)}
              disabled={direction === -1 ? edges.start : edges.end}
              aria-label={t(direction === -1 ? 'content.previous' : 'content.next')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-all hover:border-primary/60 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
            >
              {direction === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>

      {modalMounted && (
        <ChunkBoundary>
          <Suspense fallback={null}>
            <ContentModal posts={CONTENT_POSTS} index={openIndex} onIndexChange={setOpenIndex} />
          </Suspense>
        </ChunkBoundary>
      )}
    </section>
  );
};

export default ContentSection;
