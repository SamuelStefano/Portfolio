import { Github, Linkedin, FileText, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { resumeHref } from '@/lib/resume';

const LINKS = [
  { icon: Github, label: 'github.com/SamuelStefano', href: 'https://github.com/SamuelStefano' },
  { icon: Linkedin, label: 'linkedin.com/in/samuel-stefano', href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/' },
  { icon: Phone, label: '+55 44 99879-5387', href: 'tel:+5544998795387' },
];

export const CliContact = () => {
  const { t, i18n } = useTranslation();
  const links = [...LINKS.slice(0, 2), { icon: FileText, label: resumeHref(i18n.language).slice(1), href: resumeHref(i18n.language) }, ...LINKS.slice(2)];

  return (
    <div className="grid gap-2.5">
      <p className="mb-1 text-[13.5px] text-[var(--cli-text-soft)]">{t('footer.description')}</p>
      {links.map((l) => (
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
