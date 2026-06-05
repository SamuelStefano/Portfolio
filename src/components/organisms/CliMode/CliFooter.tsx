import { useTranslation } from 'react-i18next';

const SOCIALS = [
  { label: 'github', href: 'https://github.com/SamuelStefano' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/' },
  { label: 'instagram', href: 'https://instagram.com/samuel.stefano' },
];

export const CliFooter = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-[var(--cli-border)] pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--cli-text-dim)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--cli-green)]">$</span>
          <span>echo &quot;{t('hero.web3Signal')}&quot;</span>
          <span className="cli-cursor" />
        </div>
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cli-text-soft)] transition-colors duration-200 hover:text-[var(--cli-cyan)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px] text-[var(--cli-text-dim)]">
        <span className="text-[var(--cli-text-dim)]">#</span> © {year} Samuel Stefano — built with React · Vite · TypeScript
      </p>
    </footer>
  );
};

export default CliFooter;
