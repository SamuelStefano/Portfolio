import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useMatrixRain = (ref: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chars = '01<>/{}[]();=+$#ABCDEF';
    const fs = 15;
    let cols = 0;
    let drops: number[] = [];
    const size = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      cols = Math.floor(window.innerWidth / fs);
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    size();
    window.addEventListener('resize', size);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(5,8,12,.10)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = `${fs}px JetBrains Mono, monospace`;
      for (let x = 0; x < cols; x++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[x] * fs;
        ctx.fillStyle = Math.random() > 0.97 ? 'rgba(54,226,208,.9)' : 'rgba(61,220,132,.4)';
        ctx.fillText(ch, x * fs, y);
        if (y > cv.height && Math.random() > 0.975) drops[x] = 0;
        drops[x] += 0.45;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, [ref]);
};

const useTyped = (str: string) => {
  const [text, setText] = useState('');
  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      if (i <= str.length) { setText(str.slice(0, i++)); timer = setTimeout(type, 70); }
      else { timer = setTimeout(() => { i = 0; type(); }, 4000); }
    };
    type();
    return () => clearTimeout(timer);
  }, [str]);
  return text;
};

export const CliMode = () => {
  const { t } = useTranslation();
  const rainRef = useRef<HTMLCanvasElement>(null);
  useMatrixRain(rainRef);
  const typed = useTyped('whoami --full');

  const rows: [string, string][] = [
    [t('cli.role'), t('cli.roleValue')],
    [t('cli.stack'), 'React · TypeScript · Node · Supabase'],
    [t('cli.focus'), t('cli.focusValue')],
    [t('cli.uptime'), t('cli.uptimeValue')],
    [t('cli.awards'), 'ETH Latam 2025 · DevConnect 2025'],
    [t('cli.location'), t('cli.locationValue')],
  ];

  const cmds = [
    { label: 'git clone github', href: 'https://github.com/SamuelStefano', amber: false },
    { label: 'open linkedin', href: 'https://www.linkedin.com/in/samuel-stefano-425a29246/', amber: false },
    { label: 'cat resume.pdf', href: 'https://drive.google.com/file/d/1zbvD8g7rK3rSmMfeCPAR8o-DQ4zeYAvN/view?usp=sharing', amber: true },
    { label: './contact.sh', href: 'mailto:samuel@example.com', amber: false },
  ];

  return (
    <section id="inicio" className="relative min-h-screen bg-[#05080c] font-mono">
      <canvas ref={rainRef} className="pointer-events-none fixed inset-0 z-0 opacity-45" aria-hidden />
      <div className="cli-scanlines pointer-events-none fixed inset-0 z-30 opacity-50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-10">
        <div className="overflow-hidden rounded-2xl border border-[rgba(61,220,132,0.14)] bg-gradient-to-b from-[rgba(10,16,21,0.92)] to-[rgba(6,10,14,0.96)] shadow-[0_40px_120px_rgba(0,0,0,0.6),inset_0_0_80px_rgba(61,220,132,0.03)] backdrop-blur-sm">
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-[rgba(61,220,132,0.14)] bg-white/[0.02] px-4 py-3">
            <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[12.5px] text-[#5e7867]">
              samuel@stefano: <b className="font-medium text-[#36e2d0]">~/portfolio</b> — zsh — 132×40
            </span>
          </div>

          {/* body */}
          <div className="grid grid-cols-1 gap-9 p-6 text-[#cde7d8] sm:p-10 md:grid-cols-[320px_1fr]">
            <div>
              <div className="relative overflow-hidden rounded-xl border border-[rgba(61,220,132,0.3)] [filter:saturate(0.65)_brightness(0.92)]">
                <img src="/Samuel.jpg" alt="Samuel Stefano" className="block w-full" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(61,220,132,0.14)] mix-blend-overlay" />
              </div>
              <div className="mt-2.5 text-xs text-[#5e7867]">
                $ <b className="text-[#3ddc84]">view</b> {t('cli.caption')}
              </div>
            </div>

            <div>
              <div className="mb-3.5 text-[15px]">
                <span className="font-semibold text-[#3ddc84]">samuel</span>
                <span className="text-[#5e7867]">@</span>
                <span className="font-semibold text-[#36e2d0]">stefano</span>
                <span className="text-[#5e7867]">:~$</span>{' '}
                <span className="text-[#eafff4]">{typed}</span>
                <span className="cli-cursor" />
              </div>

              <div className="text-5xl font-extrabold leading-none tracking-tight text-[#eafff4]">
                Samuel{' '}
                <span className="bg-gradient-to-r from-[#3ddc84] to-[#36e2d0] bg-clip-text text-transparent">Stefano</span>
              </div>
              <div className="mb-5 mt-1.5 text-[17px] font-medium text-[#ffb454]">
                Full-Stack Developer &amp; Software Architect
              </div>

              <div className="mb-4 grid gap-2.5">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex gap-3 text-sm">
                    <span className="w-[120px] flex-shrink-0 font-semibold text-[#3ddc84]">{k}:</span>
                    <span className="text-[#bcd6c8]">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap gap-2.5">
                {cmds.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[rgba(61,220,132,0.18)] bg-[rgba(61,220,132,0.04)] px-4 py-2.5 text-[13.5px] font-medium text-[#cde7d8] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(61,220,132,0.4)] hover:bg-[rgba(61,220,132,0.12)] hover:shadow-[0_0_22px_rgba(61,220,132,0.18)]"
                  >
                    <span className={c.amber ? 'font-bold text-[#ffb454]' : 'font-bold text-[#3ddc84]'}>$</span>
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CliMode;
