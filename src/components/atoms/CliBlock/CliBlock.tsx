import { ReactNode } from 'react';

interface CliBlockProps {
  command: string;
  children: ReactNode;
}

export const CliBlock = ({ command, children }: CliBlockProps) => (
  <div className="mb-9">
    <div className="mb-3 flex flex-wrap items-center gap-x-2 text-[13.5px]">
      <span className="font-semibold text-[var(--cli-green)]">samuel</span>
      <span className="text-[var(--cli-text-dim)]">@stefano</span>
      <span className="text-[var(--cli-text-dim)]">:~$</span>
      <span className="text-[var(--cli-text-bright)]">{command}</span>
    </div>
    <div className="border-l border-[var(--cli-border)] pl-4">{children}</div>
  </div>
);

export default CliBlock;
