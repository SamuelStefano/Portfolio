import { useRef, useState } from 'react';
import { Eye, Film, GalleryHorizontalEnd, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ContentPost } from '@/consts/content';
import { formatCompact, formatContentDate, getContentCredit } from '@/lib/contentCredits';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  post: ContentPost;
  onOpen: (post: ContentPost) => void;
}

const canPreview = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ContentCard = ({ post, onOpen }: ContentCardProps) => {
  const { t, i18n } = useTranslation();
  const language = (i18n.language || 'pt').slice(0, 2);
  const videoRef = useRef<HTMLVideoElement>(null);
  // The preview video mounts on the first hover only, so the carousel never downloads video up front.
  const [previewing, setPreviewing] = useState(false);
  const firstSlide = post.slides[0];
  const preview = firstSlide.type === 'video' ? firstSlide.src : null;
  const credit = getContentCredit(post);
  const title = t(`content.items.${post.slug}.title`);

  const startPreview = () => {
    if (!preview || !canPreview()) return;
    setPreviewing(true);
    void videoRef.current?.play().catch(() => undefined);
  };
  const stopPreview = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      aria-label={`${t(`content.formats.${post.format}`)}: ${title}`}
      className={cn(
        'group relative aspect-[9/16] w-[68vw] max-w-[270px] shrink-0 snap-start overflow-hidden rounded-[28px] text-left',
        'border border-white/10 bg-card shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]',
        'transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_28px_60px_-20px_hsl(var(--primary)/0.45)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'sm:w-[240px] lg:w-[260px]',
      )}
    >
      {post.aspect === '4/5' ? (
        <>
          <img
            src={post.cover}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl saturate-150"
          />
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            className="absolute inset-x-0 top-[42%] aspect-[4/5] w-full -translate-y-1/2 object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </>
      ) : (
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}

      {preview && previewing && (
        <video
          ref={videoRef}
          src={preview}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          className={cn(
            'absolute w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100',
            post.aspect === '4/5' ? 'inset-x-0 top-[42%] aspect-[4/5] -translate-y-1/2' : 'inset-0 h-full',
          )}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/40" />

      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          {post.format === 'reel' ? <Film className="h-3.5 w-3.5" /> : <GalleryHorizontalEnd className="h-3.5 w-3.5" />}
          {t(`content.formats.${post.format}`)}
          {post.slides.length > 1 && <span className="text-white/60">· {post.slides.length}</span>}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          <Eye className="h-3.5 w-3.5" />
          {formatCompact(post.views, language)}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-primary">
          {formatContentDate(post.publishedAt, language)}
        </p>
        <h3 className="mb-2 line-clamp-3 text-base font-bold leading-snug text-white">{title}</h3>
        <p className="truncate text-xs text-white/65">
          {credit.madeFor && <span>{t('content.madeFor')} </span>}
          <span className="font-semibold text-white/85">@{credit.lead}</span>
          {credit.partners.length > 0 && (
            <span>
              {' '}
              {t('content.with')} {credit.partners.map((h) => `@${h}`).join(', ')}
            </span>
          )}
        </p>
      </div>
    </button>
  );
};

export default ContentCard;
