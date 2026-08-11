import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  X,
  ExternalLink,
  Users,
  Calendar,
  Code2,
  Globe,
  ChevronRight,
  ImageIcon,
  ZoomIn,
  ChevronLeft,
  Info,
  Layers,
  ArrowUpRight,
  Github,
  Tag,
  Terminal,
  GitBranch,
  LayoutGrid,
  Route,
} from 'lucide-react';
import { Button } from '@/components/atoms/button/button';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Project, ProjectSection } from '@/types/project';
import { getIconComponent } from '@/utils/iconResolver';
import { useMotionPreset } from '@/hooks/useMotionPreset';
import { setOverlayOpen } from '@/lib/overlayState';
import { cn, thumbSrc } from '@/lib/utils';

/* ─── helpers ──────────────────────────────────────────────────────── */

/** Get all sections from a project, normalising both data shapes */
function getSections(project: Project): ProjectSection[] {
  if (project.project_sections && project.project_sections.length > 0) {
    return [...project.project_sections].sort((a, b) => a.order_index - b.order_index);
  }
  if (project.image_categories) {
    return Object.entries(project.image_categories)
      .filter(([key]) => key !== 'hero')
      .map(([key, images], i) => ({
        id: key,
        folder_name: key,
        display_name: key.charAt(0).toUpperCase() + key.slice(1),
        description: null,
        order_index: i,
        project_images: images.map((url, j) => ({ id: `${key}-${j}`, image_url: url, order_index: j })),
      }));
  }
  return [];
}

/** Map section folder_name → Lucide icon */
const SECTION_ICONS: Record<string, React.ComponentType<any>> = {
  overview: Info,
  admin: Layers,
  dashboard: Layers,
  create: Code2,
  login: Users,
  others: ImageIcon,
  community: Users,
  landing: Globe,
  library: Layers,
  hero: Globe,
  challenges: Code2,
  challenge: Code2,
  sandbox: Terminal,
  git: GitBranch,
  canvas: LayoutGrid,
  trilha: Route,
};

function SectionIcon({ name, className }: { name: string; className?: string }) {
  const Icon = SECTION_ICONS[name.toLowerCase()] ?? ImageIcon;
  return <Icon className={cn('w-4 h-4', className)} />;
}

/** Link icon by label/type */
function LinkIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes('github') || l.includes('repo')) return <Github className="w-3.5 h-3.5" />;
  if (l.includes('discord')) return <Users className="w-3.5 h-3.5" />;
  return <Globe className="w-3.5 h-3.5" />;
}

/* ─── image lightbox ────────────────────────────────────────────────── */

interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}

/** Controlled: the parent overlay owns the index and the keyboard handling, so
 *  Escape can dismiss the lightbox without also dismissing the overlay. */
const Lightbox: React.FC<LightboxProps> = ({ images, index: idx, title, onIndexChange, onClose }) => {
  const { t } = useTranslation();
  const setIdx = onIndexChange;

  // decode neighbours ahead of time so navigating doesn't stall on a 2500px screenshot
  useEffect(() => {
    if (images.length < 2) return;
    [(idx + 1) % images.length, (idx - 1 + images.length) % images.length].forEach(i => {
      const img = new Image();
      img.src = images[i];
    });
  }, [idx, images]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={onClose}
        aria-label={t('projects.close')}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white/50 font-mono tabular-nums">
        {idx + 1} / {images.length}
      </div>

      {/* prev / next */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); setIdx((idx - 1 + images.length) % images.length); }}
            aria-label={t('projects.previousImage')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setIdx((idx + 1) % images.length); }}
            aria-label={t('projects.nextImage')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* image — no key remount: swapping src keeps the decoded bitmap path warm */}
      <img
        src={images[idx]}
        alt={`${title} — ${idx + 1}`}
        decoding="async"
        className="max-w-[96vw] max-h-[92vh] object-contain rounded-lg shadow-2xl select-none"
        onClick={e => e.stopPropagation()}
      />

      {/* strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" onClick={e => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`${t('projects.goToImage')} ${i + 1}`}
              aria-current={i === idx ? 'true' : undefined}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all',
                i === idx ? 'bg-primary w-5' : 'bg-white/30 hover:bg-white/60',
              )}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

/* ─── section gallery ────────────────────────────────────────────────── */

interface SectionGalleryProps {
  section: ProjectSection;
  projectTitle: string;
  onOpenLightbox: (images: string[], index: number, title: string) => void;
}

const SectionGallery: React.FC<SectionGalleryProps> = ({ section, projectTitle, onOpenLightbox }) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const images = section.project_images.map(img => img.image_url);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* section header card */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <SectionIcon name={section.folder_name} className="text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{section.display_name}</p>
          {section.description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{section.description}</p>
          )}
          <p className="text-xs text-muted-foreground/60 mt-1">{images.length} {t('projects.image', { count: images.length })}</p>
        </div>
      </div>

      {/* main image */}
      <div className="relative rounded-xl overflow-hidden bg-card border border-border group">
        <img
          src={images[current]}
          alt={`${section.display_name} — ${current + 1}`}
          decoding="async"
          className="w-full object-contain max-h-[68vh] cursor-zoom-in"
          onClick={() => onOpenLightbox(images, current, `${projectTitle} — ${section.display_name}`)}
        />

        {/* zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/70 rounded-full p-2.5">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* prev/next */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}
              aria-label={t('projects.previousImage')}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrent(i => (i + 1) % images.length)}
              aria-label={t('projects.nextImage')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* counter badge */}
            <div className="absolute bottom-2 right-2 bg-black/60 rounded-full px-2 py-0.5 text-xs text-white/80 font-mono">
              {current + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-150 ring-0',
                i === current
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-border hover:border-primary/50 opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={thumbSrc(img)}
                alt={`thumb ${i + 1}`}
                width={64}
                height={48}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={e => { e.currentTarget.src = img; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── overview section ───────────────────────────────────────────────── */

const OverviewSection: React.FC<{
  project: Project;
  onOpenLightbox: (images: string[], index: number, title: string) => void;
}> = ({ project, onOpenLightbox }) => {
  const { t } = useTranslation();
  const { transition, shift } = useMotionPreset();

  const totalImages = project.project_sections
    ? project.project_sections.reduce((acc, s) => acc + s.project_images.length, 0)
    : Object.values(project.image_categories ?? {}).reduce((acc, imgs) => acc + imgs.length, 0);

  const stats = [
    { label: t('projects.sections'), value: getSections(project).length },
    { label: t('projects.screenshots'), value: totalImages },
    { label: t('projects.technologies'), value: project.stack.length },
    { label: t('projects.collaboratorsSection'), value: project.project_collaborators.length },
  ];

  return (
    <motion.div
      key="overview"
      initial={shift({ opacity: 0, y: 12 })}
      animate={shift({ opacity: 1, y: 0 })}
      transition={transition({ duration: 0.3 })}
      className="space-y-6"
    >
      {/* thumbnail hero */}
      {project.thumbnail_url && (
        <div className="relative rounded-xl overflow-hidden border border-border bg-card">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            decoding="async"
            className="w-full object-contain max-h-[48vh] cursor-zoom-in"
            onClick={() => onOpenLightbox([project.thumbnail_url!], 0, project.title)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="text-center p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="text-2xl font-black gradient-text">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-sm font-semibold text-foreground">{t('projects.aboutProject')}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
          {project.long_description || project.description}
        </p>
      </div>

      {/* role */}
      <div className="flex items-center gap-2 pl-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
          <Users className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">{project.role}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/40 border border-border">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {new Date(project.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* collaborators detail */}
      {project.project_collaborators.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm font-semibold text-foreground">
              {t('projects.collaboratorsSection')}
            </p>
          </div>
          <div className="space-y-2 pl-6">
            {project.project_collaborators.map(collab => (
              <div key={collab.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors group">
                <div className="relative flex-shrink-0">
                  {collab.avatar_url ? (
                    <img
                      src={collab.avatar_url}
                      alt={collab.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/50 transition-colors"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center border-2 border-primary/20">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <span className={cn(
                    'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-background',
                    collab.role === 'Creator' ? 'bg-yellow-400' : 'bg-primary',
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  {collab.website ? (
                    <a
                      href={collab.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 truncate group/link"
                    >
                      {collab.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{collab.name}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {collab.role === 'Creator' ? '✦ Criador' : '· Colaborador'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ─── main component ─────────────────────────────────────────────────── */

export interface ProjectOverlayProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectOverlay: React.FC<ProjectOverlayProps> = React.memo(({ project, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { transition, shift } = useMotionPreset();
  const [activeSection, setActiveSection] = useState<string>('__overview__');
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; title: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((images: string[], index: number, title: string) => {
    setLightbox({ images, index, title });
  }, []);

  /* Reset active section when project changes */
  useEffect(() => {
    setActiveSection('__overview__');
    setLightbox(null);
  }, [project?.id]);

  useEffect(() => {
    if (!isOpen) setLightbox(null);
  }, [isOpen]);

  /* Pause the decorative canvas/blobs behind the overlay while it covers them */
  useEffect(() => {
    setOverlayOpen(isOpen);
    return () => setOverlayOpen(false);
  }, [isOpen]);

  /* Scroll to top of content on section change */
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  /* Body scroll lock */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      return;
    }

    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // bypass global scroll-behavior:smooth so restoring position doesn't animate from the top
      const root = document.documentElement;
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      root.style.scrollBehavior = prev;
    };
  }, [isOpen]);

  /* Keyboard — single listener so Escape peels off one layer at a time */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null);
        else onClose();
        return;
      }
      if (!lightbox || lightbox.images.length < 2) return;
      if (e.key === 'ArrowRight') {
        setLightbox(l => l && { ...l, index: (l.index + 1) % l.images.length });
      } else if (e.key === 'ArrowLeft') {
        setLightbox(l => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose, lightbox]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!project) return null;

  const sections = getSections(project);
  const ProjectIcon = getIconComponent(project.icon_name);

  const navItems = [
    { id: '__overview__', label: t('projects.overview'), icon: Info },
    ...sections.map(s => ({
      id: s.id,
      label: s.display_name,
      icon: SECTION_ICONS[s.folder_name.toLowerCase()] ?? ImageIcon,
    })),
  ];

  const currentSection = sections.find(s => s.id === activeSection) ?? null;
  const imageCount = currentSection ? currentSection.project_images.length : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-5"
          onClick={handleBackdropClick}
        >
          {/* Panel */}
          <motion.div
            initial={shift({ opacity: 0, scale: 0.95, y: 24 })}
            animate={shift({ opacity: 1, scale: 1, y: 0 })}
            exit={shift({ opacity: 0, scale: 0.95, y: 24 })}
            transition={transition({ type: 'spring', damping: 30, stiffness: 340, mass: 0.7 })}
            className="relative w-full max-w-[1600px] h-[94vh] flex flex-col bg-background rounded-2xl border border-border shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* ── gradient top bar ── */}
            <div className="h-0.5 w-full bg-gradient-to-r from-primary via-neon-purple to-neon-cyan flex-shrink-0" />

            {/* ── header ── */}
            <div className="flex-shrink-0 flex items-center gap-3 px-5 py-4 border-b border-border bg-background">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                {ProjectIcon && <ProjectIcon className="w-4.5 h-4.5 text-primary" />}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold gradient-text leading-tight truncate">
                  {project.title}
                </h2>
                <p className="text-xs text-muted-foreground truncate">{project.role}</p>
              </div>

              {/* quick links */}
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                {project.project_links.slice(0, 2).map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <LinkIcon label={link.label} />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>

              <button
                onClick={onClose}
                aria-label={t('projects.close')}
                className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── body ── */}
            <div className="flex-1 flex overflow-hidden">

              {/* ── LEFT SIDEBAR ── */}
              <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-border overflow-y-auto">
                {/* nav */}
                <div className="p-3 space-y-0.5">
                  <p className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('projects.sections')}
                  </p>
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 text-left',
                          isActive
                            ? 'bg-primary/15 text-primary font-medium border border-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                        )}
                      >
                        <Icon className={cn('w-3.5 h-3.5 flex-shrink-0', isActive ? 'text-primary' : '')} />
                        <span className="truncate">{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-border/60 mx-3" />

                {/* tech stack */}
                <div className="p-3 pt-4">
                  <div className="flex items-center gap-1.5 mb-2 px-1">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('projects.techStack')}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-md bg-secondary/60 text-foreground/80 border border-border hover:border-primary/40 hover:text-primary transition-colors cursor-default font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* links */}
                {project.project_links.length > 0 && (
                  <>
                    <div className="border-t border-border/60 mx-3" />
                    <div className="p-3 pt-4">
                      <div className="flex items-center gap-1.5 mb-2 px-1">
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('projects.links')}</p>
                      </div>
                      <div className="space-y-1.5 px-1">
                        {project.project_links.map(link => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-primary hover:bg-primary/8 border border-transparent hover:border-primary/20 transition-all group"
                          >
                            <LinkIcon label={link.label} />
                            <span className="flex-1 truncate">{link.label}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* collaborators */}
                {project.project_collaborators.length > 0 && (
                  <>
                    <div className="border-t border-border/60 mx-3" />
                    <div className="p-3 pt-4 pb-5">
                      <div className="flex items-center gap-1.5 mb-2 px-1">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('projects.projectTeam')}</p>
                      </div>
                      <div className="space-y-2 px-1">
                        {project.project_collaborators.map(collab => (
                          <div key={collab.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                            {collab.avatar_url ? (
                              <img
                                src={collab.avatar_url}
                                alt={collab.name}
                                className="w-7 h-7 rounded-full object-cover border border-primary/20 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20 flex-shrink-0">
                                <Users className="w-3.5 h-3.5 text-primary" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              {collab.website ? (
                                <a
                                  href={collab.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-medium text-foreground hover:text-primary transition-colors flex items-center gap-0.5 truncate group/link"
                                >
                                  {collab.name}
                                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                                </a>
                              ) : (
                                <p className="text-xs font-medium text-foreground truncate">{collab.name}</p>
                              )}
                              <p className="text-xs text-muted-foreground/70">
                                {collab.role === 'Creator' ? '✦ Criador' : '· Colaborador'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </aside>

              {/* ── MAIN CONTENT ── */}
              <main
                ref={contentRef}
                data-overlay-content
                className="flex-1 overflow-y-auto"
              >
                {/* mobile tab bar */}
                <div className="lg:hidden sticky top-0 z-10 bg-background border-b border-border overflow-x-auto scrollbar-none">
                  <div className="flex gap-1 p-2 min-w-max">
                    {navItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={cn(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all',
                            isActive
                              ? 'bg-primary/15 text-primary font-medium border border-primary/20'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                          )}
                        >
                          <Icon className="w-3 h-3" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 lg:p-7 space-y-6">
                  {/* breadcrumb */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <span className="truncate max-w-[120px]">{project.title}</span>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-foreground/80 font-medium">
                      {navItems.find(n => n.id === activeSection)?.label ?? t('projects.overview')}
                    </span>
                    {activeSection !== '__overview__' && imageCount > 0 && (
                      <>
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        <span>{imageCount} {t('projects.image', { count: imageCount })}</span>
                      </>
                    )}
                  </div>

                  {/* content */}
                  <AnimatePresence mode="wait">
                    {activeSection === '__overview__' ? (
                      <OverviewSection key="overview" project={project} onOpenLightbox={openLightbox} />
                    ) : (
                      currentSection && (
                        <motion.div
                          key={currentSection.id}
                          initial={shift({ opacity: 0, y: 8 })}
                          animate={shift({ opacity: 1, y: 0 })}
                          exit={shift({ opacity: 0 })}
                          transition={transition({ duration: 0.16 })}
                        >
                          <SectionGallery
                            section={currentSection}
                            projectTitle={project.title}
                            onOpenLightbox={openLightbox}
                          />
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </div>

                {/* footer nav */}
                {sections.length > 1 && (
                  <div className="flex items-center justify-between gap-3 px-5 lg:px-7 py-4 border-t border-border bg-background sticky bottom-0">
                    <button
                      onClick={() => {
                        const allIds = navItems.map(n => n.id);
                        const cur = allIds.indexOf(activeSection);
                        if (cur > 0) setActiveSection(allIds[cur - 1]);
                      }}
                      disabled={activeSection === navItems[0].id}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t('projects.previous')}
                    </button>

                    <div className="flex gap-1">
                      {navItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          aria-label={item.label}
                          aria-current={activeSection === item.id ? 'true' : undefined}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-all duration-200',
                            activeSection === item.id ? 'bg-primary w-5' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60',
                          )}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const allIds = navItems.map(n => n.id);
                        const cur = allIds.indexOf(activeSection);
                        if (cur < allIds.length - 1) setActiveSection(allIds[cur + 1]);
                      }}
                      disabled={activeSection === navItems[navItems.length - 1].id}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      {t('projects.next')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </main>
            </div>
          </motion.div>

          <AnimatePresence>
            {lightbox && (
              <Lightbox
                images={lightbox.images}
                index={lightbox.index}
                title={lightbox.title}
                onIndexChange={next => setLightbox(l => l && { ...l, index: next })}
                onClose={() => setLightbox(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default ProjectOverlay;
