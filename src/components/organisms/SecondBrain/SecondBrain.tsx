import { useEffect, useRef } from 'react';

type Node = {
  label: string;
  sub: string;
  color: string;
  a: number;
  dy?: number;
};

// fixed angular slots 45° apart so nodes never cross or overlap each other
const NODES: Node[] = [
  { label: 'React',      sub: 'Frontend',   color: '#61dafb', a: -67.5, dy: 26 },
  { label: 'TypeScript', sub: 'Language',   color: '#3178c6', a: -22.5 },
  { label: 'Supabase',   sub: 'Backend',    color: '#3ecf8e', a: 22.5  },
  { label: 'Web3',       sub: 'Solidity',   color: '#a855f7', a: 67.5  },
  { label: 'Claude AI',  sub: 'LLM',        color: '#d97757', a: 112.5 },
  { label: 'n8n',        sub: 'Automation', color: '#ea4b71', a: 157.5 },
  { label: 'Next.js',    sub: 'Framework',  color: '#e8eaf0', a: 202.5 },
  { label: 'Docker',     sub: 'DevOps',     color: '#2496ed', a: 247.5, dy: 26 },
];

export const SecondBrain = () => {
  const brainRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const linkRefs = useRef<SVGLineElement[]>([]);
  const flowRefs = useRef<SVGLineElement[]>([]);

  useEffect(() => {
    const brain = brainRef.current;
    if (!brain) return;

    const layout = () => {
      const r = brain.getBoundingClientRect();
      const BW = r.width, BH = r.height, cx = BW / 2, cy = BH / 2;
      const narrow = BW < 480;
      // wide horizontal radius pulls the near-top/bottom pairs apart and keeps the
      // side nodes off the centre photo; vertical radius spreads the stacked pairs
      const rx = Math.max(narrow ? 185 : 205, Math.min(BW * 0.46, 230));
      const ry = Math.max(narrow ? 195 : 205, Math.min(BH * 0.43, 235));

      NODES.forEach((n, i) => {
        const ang = (n.a * Math.PI) / 180;
        const x = cx + Math.cos(ang) * rx;
        const y = cy + Math.sin(ang) * ry + (n.dy ?? 0);
        const el = nodeRefs.current[i];
        if (el) {
          el.style.left = `${x.toFixed(1)}px`;
          el.style.top = `${y.toFixed(1)}px`;
        }
        const line = linkRefs.current[i], flow = flowRefs.current[i];
        if (line) { line.setAttribute('x1', `${cx.toFixed(1)}`); line.setAttribute('y1', `${cy.toFixed(1)}`); line.setAttribute('x2', `${x.toFixed(1)}`); line.setAttribute('y2', `${y.toFixed(1)}`); }
        if (flow) { flow.setAttribute('x1', `${cx.toFixed(1)}`); flow.setAttribute('y1', `${cy.toFixed(1)}`); flow.setAttribute('x2', `${x.toFixed(1)}`); flow.setAttribute('y2', `${y.toFixed(1)}`); }
      });
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(brain);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={brainRef}
      className="relative h-[460px] w-full max-w-[520px] sm:h-[500px] lg:h-[560px]"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {NODES.map((_, i) => (
          <g key={i}>
            <line ref={(el) => { if (el) linkRefs.current[i] = el; }} className="brain-link" />
            <line ref={(el) => { if (el) flowRefs.current[i] = el; }} className="brain-flow" />
          </g>
        ))}
      </svg>

      <div className="brain-orbit absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(var(--net),0.14)]" />
      <div className="brain-orbit reverse absolute left-1/2 top-1/2 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(var(--net),0.12)]" />

      <div className="brain-ring absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[8px]" />

      <div
        className="absolute left-1/2 top-1/2 z-[3] h-[188px] w-[188px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-card shadow-[0_0_0_1px_rgba(var(--net),0.3),0_30px_80px_rgba(5,12,40,0.7)] sm:h-[248px] sm:w-[248px] lg:h-[280px] lg:w-[280px]"
      >
        <img src="/Samuel.jpg" alt="Samuel Stefano" draggable={false} className="h-full w-full object-cover object-[center_44%]" />
      </div>

      {NODES.map((n, i) => (
        <div
          key={n.label}
          ref={(el) => { if (el) nodeRefs.current[i] = el; }}
          className="node absolute z-[5] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-card/85 px-2.5 py-1.5 font-mono text-[12px] font-semibold text-foreground shadow-[0_12px_30px_rgba(5,10,30,0.55)] backdrop-blur-sm transition-[box-shadow,border-color] duration-200 hover:border-[rgba(var(--net),0.6)] hover:shadow-[0_0_24px_rgba(var(--net),0.35)]"
          style={{ left: '50%', top: '50%' }}
        >
          <i className="block h-2.5 w-2.5 flex-shrink-0 rounded" style={{ background: n.color }} />
          <span className="flex flex-col leading-tight">
            <span>{n.label}</span>
            <small className="text-[10px] font-medium text-muted-foreground">{n.sub}</small>
          </span>
        </div>
      ))}
    </div>
  );
};

export default SecondBrain;
