import { Github, Linkedin, Instagram, FileText, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LINKS = [
  { icon: Github, label: 'github.com/SamuelStefano', href: 'https://github.com/SamuelStefano' },
  { icon: Linkedin, label: 'linkedin.com/in/samuel-stefano', href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/' },
  { icon: Instagram, label: 'instagram.com/samuel.stefano', href: 'https://instagram.com/samuel.stefano' },
  { icon: FileText, label: 'resume.pdf', href: 'https://drive.google.com/file/d/1zbvD8g7rK3rSmMfeCPAR8o-DQ4zeYAvN/view?usp=sharing' },
  { icon: Phone, label: '+55 44 99879-5387', href: 'tel:+5544998795387' },
];

export const CliContact = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-2.5">
      <p className="mb-1 text-[13.5px] text-[var(--cli-text-soft)]">{t('about.availability.description')}</p>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2.5 rounded-lg border border-[var(--cli-border)] bg-[var(--cli-surface)] px-4 py-2 text-[13px] font-medium text-[var(--cli-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--cli-border-strong)] hover:bg-[var(--cli-surface-hover)]"
        >
          <l.icon className="h-4 w-4 text-[var(--cli-green)]" />
          {l.label}
        </a>
      ))}
    </div>
  );
};

export default CliContact;
