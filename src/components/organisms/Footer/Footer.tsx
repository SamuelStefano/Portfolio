import { useRef, useState } from 'react';
import { Mail, Phone, Check, Copy, FileText, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { SOCIAL_LINKS } from '@/consts/components';
import { resumeHref } from '@/lib/resume';

const EMAIL = 'samuelstefanodocarmo@gmail.com';
const PHONE_LABEL = '+55 (44) 99879-5387';
const PHONE_HREF = 'tel:+5544998795387';

interface FooterProps {
  onOpenGame?: () => void;
}

const linkClass =
  'inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary';

export const Footer = ({ onOpenGame }: FooterProps) => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer id="contato" className="scroll-mt-20 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">
          <div>
            <Heading level={2} className="mb-3 text-2xl sm:text-3xl tracking-tight text-foreground">
              {t('footer.contact')}
            </Heading>
            <Text className="mb-4 max-w-md text-sm sm:text-base text-muted-foreground">{t('footer.description')}</Text>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {t('footer.location')}
            </span>
          </div>

          <ul className="space-y-3">
            <li>
              <button type="button" onClick={handleCopyEmail} title={t('footer.clickToCopy')} className={`${linkClass} group`}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Mail className="h-4 w-4" />}
                <span className={copied ? 'text-green-500' : ''}>{copied ? t('footer.emailCopied') : EMAIL}</span>
                {!copied && <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />}
              </button>
            </li>
            <li>
              <a href={PHONE_HREF} className={linkClass}>
                <Phone className="h-4 w-4" />
                {PHONE_LABEL}
              </a>
            </li>
            <li>
              <a href={resumeHref(i18n.language)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FileText className="h-4 w-4" />
                {t('footer.resume')}
                <span className="text-xs text-muted-foreground/60">· {t('footer.resumeNote')}</span>
              </a>
            </li>
          </ul>

          <ul className="space-y-3">
            {SOCIAL_LINKS.slice(0, 2).map((link) => {
              const LinkIcon = link.icon;
              return (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <LinkIcon className="h-4 w-4" />
                    {t(link.labelKey)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Samuel Stefano</span>
          {onOpenGame && (
            <button
              type="button"
              onClick={onOpenGame}
              className="font-mono text-muted-foreground/70 transition-colors hover:text-primary"
            >
              {t('footer.snake')} →
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
