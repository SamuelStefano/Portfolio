import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Heart, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/atoms/dialog/dialog';
import type { ContentPost } from '@/consts/content';
import { formatContentDate, getContentCredit } from '@/lib/contentCredits';
import { cn } from '@/lib/utils';

const MEDIA_RATIO: Record<ContentPost['aspect'], number> = { '9/16': 9 / 16, '4/5': 4 / 5 };

interface ContentModalProps {
  posts: ContentPost[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export const ContentModal = ({ posts, index, onIndexChange }: ContentModalProps) => {
  const { t, i18n } = useTranslation();
  const language = (i18n.language || 'pt').slice(0, 2);
  // The slide belongs to the post it was picked on, so switching posts starts at the first slide.
  const [picked, setPicked] = useState({ index, slide: 0 });
  const slide = picked.index === index ? picked.slide : 0;
  const setSlide = useCallback((next: number) => setPicked({ index, slide: next }), [index]);
  const post = index === null ? null : posts[index];

  const slideCount = post?.slides.length ?? 0;
  const goSlide = useCallback(
    (delta: number) => setSlide(Math.min(Math.max(slide + delta, 0), slideCount - 1)),
    [setSlide, slide, slideCount],
  );
  const goPost = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + posts.length) % posts.length);
  };

  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goSlide(1);
      if (e.key === 'ArrowLeft') goSlide(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [post, goSlide]);

  if (!post) return null;

  const current = post.slides[slide];
  const credit = getContentCredit(post);
  const numberFormat = new Intl.NumberFormat(language);

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onIndexChange(null)}>
      <DialogContent className="max-h-[94vh] w-[96vw] max-w-5xl grid-cols-1 gap-0 overflow-y-auto overflow-x-hidden border-white/10 bg-background p-0 sm:rounded-3xl md:grid md:grid-cols-[minmax(0,1fr)_340px] md:overflow-hidden">
        <div className="relative flex min-w-0 items-center justify-center bg-black px-3 py-4 sm:px-6 sm:py-6">
          <img
            src={post.cover}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-3xl"
          />
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10 [--media-h:min(60vh,820px)]',
              post.aspect === '9/16' ? 'aspect-[9/16] md:[--media-h:min(80vh,820px)]' : 'aspect-[4/5] md:[--media-h:min(70vh,720px)]',
            )}
            // Width follows the height budget, so the frame never overflows a narrow screen.
            style={{ width: `min(100%, calc(var(--media-h) * ${MEDIA_RATIO[post.aspect]}))` }}
          >
            {current.type === 'video' ? (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                playsInline
                onEnded={() => goSlide(1)}
                className="h-full w-full bg-black object-contain"
              />
            ) : (
              <img
                key={current.src}
                src={current.src}
                alt={`${t(`content.items.${post.slug}.title`)} — ${slide + 1}/${slideCount}`}
                className="h-full w-full object-contain animate-in fade-in-0 duration-300"
              />
            )}

            {slideCount > 1 && (
              <>
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  {slide + 1}/{slideCount}
                </span>
                <button
                  type="button"
                  onClick={() => goSlide(-1)}
                  disabled={slide === 0}
                  aria-label={t('content.previousSlide')}
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goSlide(1)}
                  disabled={slide === slideCount - 1}
                  aria-label={t('content.nextSlide')}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div
                  className={cn(
                    'absolute inset-x-0 flex justify-center gap-1.5',
                    current.type === 'video' ? 'top-3' : 'bottom-3',
                  )}
                >
                  {post.slides.map((s, i) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setSlide(i)}
                      aria-label={t('content.goToSlide', { index: i + 1 })}
                      aria-current={i === slide}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        i === slide ? 'w-5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70',
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5 p-6 md:overflow-y-auto">
          <div className="flex items-center gap-3 pr-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px]">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-background">
                <Instagram className="h-4 w-4 text-foreground" />
              </span>
            </span>
            <div className="min-w-0 text-sm">
              <p className="truncate">
                {credit.madeFor && <span className="text-muted-foreground">{t('content.madeFor')} </span>}
                <span className="font-semibold">@{credit.lead}</span>
              </p>
              {credit.partners.length > 0 && (
                <p className="truncate text-xs text-muted-foreground">
                  {t('content.with')} {credit.partners.map((h) => `@${h}`).join(', ')}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
              {t(`content.formats.${post.format}`)}
              {slideCount > 1 && ` · ${t('content.slides', { count: slideCount })}`}
              {' · '}
              {formatContentDate(post.publishedAt, language)}
            </p>
            <DialogTitle className="text-xl font-bold leading-snug sm:text-2xl">
              {t(`content.items.${post.slug}.title`)}
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(`content.items.${post.slug}.summary`)}
            </DialogDescription>
          </div>

          <div className="flex gap-5 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-primary" />
              {t('content.views', { value: numberFormat.format(post.views) })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-pink-500" />
              {t('content.likes', { value: numberFormat.format(post.likes) })}
            </span>
          </div>

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            <Instagram className="h-4 w-4" />
            {t('content.openOnInstagram')}
          </a>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
            <button
              type="button"
              onClick={() => goPost(-1)}
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('content.previous')}
            </button>
            <span className="text-xs text-muted-foreground">
              {(index ?? 0) + 1}/{posts.length}
            </span>
            <button
              type="button"
              onClick={() => goPost(1)}
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            >
              {t('content.next')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
