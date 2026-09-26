import { useCallback, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Maximize2, Pause, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '@/components/molecules/StatusBadge/StatusBadge';
import { loadProjectOverlay } from '@/components/organisms/ProjectOverlay/loadProjectOverlay';
import { useProjectOverlay } from '@/hooks/useProjectOverlay';
import { useInView } from '@/hooks/useInView';
import { usePageVisible } from '@/hooks/usePageVisible';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cardSrc, cn, thumbSrc } from '@/lib/utils';
import { primaryLink, linkLabel } from '@/lib/projectLinks';
import type { Project } from '@/types/project';

const SLIDE_MS = 8000;
const SWIPE_PX = 48;

interface FeaturedProjectsProps {
  projects: Project[];
}

/**
 * Showcase for the flagship projects. Autoplay is driven by the CSS progress bar of the
 * active thumbnail: the bar's `animationend` advances the slide, so pausing is just
 * `animation-play-state`. It pauses on hover, keyboard focus, when the carousel leaves the
 * viewport, when the tab is hidden, when the visitor presses pause, and never starts under
 * `prefers-reduced-motion`.
 */
export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const { t } = useTranslation();
  const { openProject } = useProjectOverlay();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, 0.35);
  const pageVisible = usePageVisible();
  const reducedMotion = usePrefersReducedMotion();

  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const count = projects.length;
  const autoplay = !reducedMotion && !userPaused;
  const running = autoplay && inView && pageVisible && !hovered && !keyboardFocus;

  const goTo = useCallback(
    (target: number) => {
      setIndex(((target % count) + count) % count);
      setRun((r) => r + 1);
    },
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const drag = useRef<{ x: number; y: number } | null>(null);
  const swallowClick = useRef(false);

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      swallowClick.current = true;
      if (dx < 0) next();
      else prev();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const onFocus = (e: FocusEvent) => {
    if ((e.target as HTMLElement).matches(':focus-visible')) setKeyboardFocus(true);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  if (count === 0) return null;

  const current = projects[index];
  const currentLink = primaryLink(current);

  const openCurrent = () => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    openProject(current);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={t('projects.carouselLabel')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className="relative"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
        {/* ── stage: screenshot in a browser frame ── */}
        <div className="group/stage relative">
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.45)] transition-transform duration-500 group-hover/stage:-translate-y-1">
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
                {linkLabel(currentLink) || current.title.toLowerCase()}
              </div>
            </div>

            <button
              type="button"
              onClick={openCurrent}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerEnter={() => void loadProjectOverlay()}
              aria-label={`${t('projects.viewDetails')}: ${current.title}`}
              className="relative block aspect-video w-full cursor-pointer overflow-hidden bg-background [touch-action:pan-y]"
            >
              {projects.map((project, i) => (
                <img
                  key={project.id}
                  src={project.thumbnail_url ? cardSrc(project.thumbnail_url) : undefined}
                  onError={(e) => {
                    if (project.thumbnail_url) e.currentTarget.src = project.thumbnail_url;
                  }}
                  alt=""
                  aria-hidden
                  draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full select-none object-cover object-top"
                  style={{
                    transformOrigin: '0% 0%',
                    opacity: i === index ? 1 : 0,
                    transform: i === index && !reducedMotion ? 'scale(1.045)' : 'scale(1)',
                    transition: reducedMotion
                      ? 'opacity 300ms ease'
                      : `opacity 700ms ease, transform ${SLIDE_MS + 1500}ms linear`,
                  }}
                />
              ))}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              <span className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-2 rounded-full border border-primary/40 bg-background/85 px-4 py-1.5 text-xs font-medium text-primary opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/stage:translate-y-0 group-hover/stage:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" />
                {t('projects.viewDetails')}
              </span>
            </button>
          </div>
        </div>

        {/* ── info panel: every slide stacked in one grid cell, so the height never jumps ── */}
        <div className="flex flex-col">
          <div className="grid" aria-live={running ? 'off' : 'polite'}>
            {projects.map((project, i) => {
              const active = i === index;
              const link = primaryLink(project);
              const isRepo = link?.type === 'github' || link?.url.includes('github.com');
              return (
                <article
                  key={project.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t('projects.slideOf', { current: i + 1, total: count })}
                  aria-hidden={!active}
                  className={cn(
                    '[grid-area:1/1] transition-all duration-500 ease-out',
                    active ? 'visible translate-y-0 opacity-100 delay-100' : 'invisible translate-y-3 opacity-0',
                  )}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                    </span>
                    {project.status && <StatusBadge status={project.status} />}
                    <span className="text-muted-foreground">
                      {t(`projects.roles.${project.role}`, { defaultValue: project.role })}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-5 sm:text-base">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary"
                      >
                        {tech}
                      </li>
                    ))}
                    {project.stack.length > 6 && (
                      <li className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        +{project.stack.length - 6}
                      </li>
                    )}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openProject(project)}
                      onPointerEnter={() => void loadProjectOverlay()}
                      onFocus={() => void loadProjectOverlay()}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
                    >
                      <Maximize2 className="h-4 w-4" />
                      {t('projects.viewDetails')}
                    </button>
                    {link && (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:text-primary"
                      >
                        {isRepo ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        {isRepo ? t('projects.openRepo') : t('projects.openSite')}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={t('projects.previous')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t('projects.next')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? t('projects.play') : t('projects.pause')}
                title={userPaused ? t('projects.play') : t('projects.pause')}
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── thumbnail rail doubles as the slide picker and the autoplay progress ── */}
      <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
        {projects.map((project, i) => {
          const active = i === index;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t('projects.slideOf', { current: i + 1, total: count })}: ${project.title}`}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'group/thumb relative overflow-hidden rounded-lg border bg-card text-left transition-all duration-300 hover:-translate-y-0.5',
                active ? 'border-primary/60 shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.6)]' : 'border-border hover:border-primary/30',
              )}
            >
              {project.thumbnail_url && (
                <img
                  src={thumbSrc(project.thumbnail_url)}
                  onError={(e) => {
                    if (project.thumbnail_url) e.currentTarget.src = project.thumbnail_url;
                  }}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'h-12 w-full object-cover object-top transition-opacity duration-300 sm:h-16',
                    active ? 'opacity-100' : 'opacity-50 group-hover/thumb:opacity-90',
                  )}
                />
              )}
              <span
                className={cn(
                  'block truncate px-2 py-1.5 text-[11px] font-medium sm:text-xs',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {project.title}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-border/60">
                {active &&
                  (autoplay ? (
                    <span
                      key={run}
                      className="carousel-progress"
                      style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                      onAnimationEnd={next}
                    />
                  ) : (
                    <span className="block h-full w-full bg-primary/70" />
                  ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProjects;
