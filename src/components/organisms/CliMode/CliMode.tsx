import { useRef } from 'react';
import { useMatrixRain } from '@/hooks/useMatrixRain';
import { CliBlock } from '@/components/atoms/CliBlock/CliBlock';
import { CliHero } from './CliHero';
import { CliProjects } from './CliProjects';
import { CliSkills } from './CliSkills';
import { CliAwards } from './CliAwards';
import { CliAbout } from './CliAbout';
import { CliContact } from './CliContact';

export const CliMode = () => {
  const rainRef = useRef<HTMLCanvasElement>(null);
  useMatrixRain(rainRef);

  return (
    <section className="relative min-h-screen bg-[var(--cli-bg)] font-mono">
      <canvas ref={rainRef} className="pointer-events-none fixed inset-0 z-0 opacity-45" aria-hidden />
      <div className="cli-scanlines pointer-events-none fixed inset-0 z-30 opacity-50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-10">
        <div className="overflow-hidden rounded-2xl border border-[var(--cli-border)] bg-gradient-to-b from-[var(--cli-panel)] to-[var(--cli-panel-2)] shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-[var(--cli-border)] bg-white/[0.02] px-4 py-3">
            <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[12.5px] text-[var(--cli-text-dim)]">
              samuel@stefano: <b className="font-medium text-[var(--cli-cyan)]">~/portfolio</b> — zsh — 132×40
            </span>
          </div>

          <div className="p-6 text-[var(--cli-text)] sm:p-10">
            <div id="inicio" className="mb-10 scroll-mt-24">
              <CliHero />
            </div>

            <div id="projetos" className="scroll-mt-24">
              <CliBlock command="ls -la ~/projects"><CliProjects /></CliBlock>
            </div>

            <div id="habilidades" className="scroll-mt-24">
              <CliBlock command="cat skills.json"><CliSkills /></CliBlock>
            </div>

            <div id="hackathons" className="scroll-mt-24">
              <CliBlock command="cat awards.log"><CliAwards /></CliBlock>
            </div>

            <div id="sobre" className="scroll-mt-24">
              <CliBlock command="whoami --bio"><CliAbout /></CliBlock>
            </div>

            <div id="contato" className="scroll-mt-24">
              <CliBlock command="./contact.sh"><CliContact /></CliBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CliMode;
