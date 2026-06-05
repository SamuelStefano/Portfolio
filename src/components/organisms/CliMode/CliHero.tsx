import { useTranslation } from 'react-i18next';
import { useTyped } from '@/hooks/useTyped';

const CMDS = [
  { label: 'git clone github', href: 'https://github.com/SamuelStefano', amber: false },
  { label: 'open linkedin', href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/', amber: false },
  { label: 'cat resume.pdf', href: 'https://drive.google.com/file/d/1zbvD8g7rK3rSmMfeCPAR8o-DQ4zeYAvN/view?usp=sharing', amber: true },
];

export const CliHero = () => {
  const { t } = useTranslation();
  const typed = useTyped('whoami --full');

  const rows: [string, string][] = [
    [t('cli.role'), t('cli.roleValue')],
    [t('cli.stack'), 'React · TypeScript · Node · Supabase'],
    [t('cli.focus'), t('cli.focusValue')],
    [t('cli.uptime'), t('cli.uptimeValue')],
    [t('cli.awards'), 'Hackanation 2026 · ETH Latam 2025 · DevConnect 2025'],
    [t('cli.location'), t('cli.locationValue')],
  ];

  return (
    <div className="grid grid-cols-1 gap-9 md:grid-cols-[300px_1fr]">
      <div>
        <div className="relative overflow-hidden rounded-xl border border-[var(--cli-border-strong)] [filter:saturate(0.7)]">
          <img src="/Samuel.jpg" alt="Samuel Stefano" className="block w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[var(--cli-surface-hover)] mix-blend-overlay" />
        </div>
        <div className="mt-2.5 text-xs text-[var(--cli-text-dim)]">
          $ <b className="text-[var(--cli-green)]">view</b> {t('cli.caption')}
        </div>
      </div>

      <div>
        <div className="mb-3.5 text-[15px]">
          <span className="font-semibold text-[var(--cli-green)]">samuel</span>
          <span className="text-[var(--cli-text-dim)]">@</span>
          <span className="font-semibold text-[var(--cli-cyan)]">stefano</span>
          <span className="text-[var(--cli-text-dim)]">:~$</span>{' '}
          <span className="text-[var(--cli-text-bright)]">{typed}</span>
          <span className="cli-cursor" />
        </div>

        <div className="text-5xl font-extrabold leading-none tracking-tight text-[var(--cli-text-bright)]">
          Samuel{' '}
          <span className="bg-gradient-to-r from-[var(--cli-green)] to-[var(--cli-cyan)] bg-clip-text text-transparent">Stefano</span>
        </div>
        <div className="mb-5 mt-1.5 text-[17px] font-medium text-[var(--cli-amber)]">
          Full-Stack Developer &amp; Software Architect
        </div>

        <div className="mb-4 grid gap-2.5">
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-3 text-sm">
              <span className="w-[120px] flex-shrink-0 font-semibold text-[var(--cli-green)]">{k}:</span>
              <span className="text-[var(--cli-text-soft)]">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-2.5">
          {CMDS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--cli-border)] bg-[var(--cli-surface)] px-4 py-2.5 text-[13.5px] font-medium text-[var(--cli-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--cli-border-strong)] hover:bg-[var(--cli-surface-hover)]"
            >
              <span className="font-bold" style={{ color: c.amber ? 'var(--cli-amber)' : 'var(--cli-green)' }}>$</span>
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CliHero;
