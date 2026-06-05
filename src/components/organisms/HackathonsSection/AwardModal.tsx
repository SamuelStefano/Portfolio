import { Trophy, Calendar, MapPin, Users, ExternalLink, Github, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/atoms/dialog/dialog';
import type { Hackathon } from '@/consts/hackathons';

interface AwardModalProps {
  hackathon: Hackathon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AwardModal = ({ hackathon, open, onOpenChange }: AwardModalProps) => {
  const { t } = useTranslation();
  if (!hackathon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden border-primary/30 p-0">
        <div className="relative bg-gradient-primary px-6 py-7 sm:px-8">
          <div className="absolute right-6 top-6 opacity-20">
            <Award className="h-20 w-20 text-white" />
          </div>
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
              <Trophy className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-bold text-yellow-300">{t(hackathon.achievementKey)}</span>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-white sm:text-3xl">{hackathon.name}</DialogTitle>
              <DialogDescription className="text-white/80">{hackathon.event}</DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>{hackathon.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>{hackathon.date}</span>
            </div>
            {hackathon.team && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground sm:col-span-2">
                <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{hackathon.team.join(', ')}</span>
              </div>
            )}
          </div>

          <p className="mb-5 text-sm leading-relaxed text-foreground/90 sm:text-base">
            {t(hackathon.descriptionKey)}
          </p>

          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
              {t('hackathons.technologies')}
            </p>
            <div className="flex flex-wrap gap-2">
              {hackathon.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={hackathon.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              <span>{t('hackathons.viewProject')}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={hackathon.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-card px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AwardModal;
