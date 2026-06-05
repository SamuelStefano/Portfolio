import { useEffect, useRef } from 'react';

type Node = { label: string; sub: string; color: string; depth: number; a: number; rx: number; ry: number };

const NODES: Node[] = [
  { label: 'React',      sub: 'Frontend',   color: '#61dafb', depth: 1.4, a: -90, rx: 0.92, ry: 0.9 },
  { label: 'TypeScript', sub: 'Language',   color: '#3178c6', depth: 1.0, a: -38, rx: 1.02, ry: 0.96 },
  { label: 'Supabase',   sub: 'Backend',    color: '#3ecf8e', depth: 1.7, a: 16,  rx: 0.96, ry: 0.98 },
  { label: 'Web3',       sub: 'Solidity',   color: '#a855f7', depth: 1.2, a: 62,  rx: 1.0,  ry: 0.95 },
  { label: 'Claude AI',  sub: 'LLM',        color: '#d97757', depth: 1.9, a: 118, rx: 0.98, ry: 0.98 },
  { label: 'n8n',        sub: 'Automation', color: '#ea4b71', depth: 1.1, a: 162, rx: 1.02, ry: 0.95 },
  { label: 'Next.js',    sub: 'Framework',  color: '#e8eaf0', depth: 1.5, a: 214, rx: 0.95, ry: 0.98 },
  { label: 'Docker',     sub: 'DevOps',     color: '#2496ed', depth: 1.0, a: 270, rx: 0.9,  ry: 0.9 },
];

export const SecondBrain = () => {
  const brainRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const linkRefs = useRef<SVGLineElement[]>([]);
  const flowRefs = useRef<SVGLineElement[]>([]);

  useEffect(() => {
    const brain = brainRef.current;
    if (!brain) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let tmx = 0.5, tmy = 0.5, cmx = 0.5, cmy = 0.5;
    const onMove = (e: MouseEvent) => {
      const r = brain.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width;
      tmy = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => { tmx = 0.5; tmy = 0.5; };
    brain.addEventListener('mousemove', onMove);
    brain.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const render = (t: number) => {
      const r = brain.getBoundingClientRect();
      const BW = r.width, BH = r.height, cx = BW / 2, cy = BH / 2;
      cmx += (tmx - cmx) * 0.07;
      cmy += (tmy - cmy) * 0.07;
      const narrow = BW < 480;
      const rx = Math.min(BW * (narrow ? 0.3 : 0.42), 300), ry = Math.min(BH * (narrow ? 0.34 : 0.4), 230);
      const tm = (t || 0) / 1000;

      NODES.forEach((n, i) => {
        const ang = (n.a * Math.PI) / 180;
        const fx = Math.sin(tm * 0.6 + i) * 5;
        const fy = Math.cos(tm * 0.5 + i * 1.3) * 5;
        const px = (cmx - 0.5) * n.depth * 26;
        const py = (cmy - 0.5) * n.depth * 26;
        const x = cx + Math.cos(ang) * rx * n.rx + fx + px;
        const y = cy + Math.sin(ang) * ry * n.ry + fy + py;
        const el = nodeRefs.current[i];
        if (el) { el.style.left = `${x}px`; el.style.top = `${y}px`; }
        const ccx = cx + (cmx - 0.5) * 10, ccy = cy + (cmy - 0.5) * 10;
        const line = linkRefs.current[i], flow = flowRefs.current[i];
        if (line) { line.setAttribute('x1', `${ccx}`); line.setAttribute('y1', `${ccy}`); line.setAttribute('x2', `${x}`); line.setAttribute('y2', `${y}`); }
        if (flow) { flow.setAttribute('x1', `${ccx}`); flow.setAttribute('y1', `${ccy}`); flow.setAttribute('x2', `${x}`); flow.setAttribute('y2', `${y}`); }
      });

      if (coreRef.current) {
        coreRef.current.style.transform = `translate(-50%,-50%) translate(${(cmx - 0.5) * 12}px,${(cmy - 0.5) * 12}px)`;
      }
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    if (reduce) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      brain.removeEventListener('mousemove', onMove);
      brain.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={brainRef}
      className="relative h-[420px] w-full max-w-[520px] sm:h-[480px] lg:h-[540px]"
    >
      <svg ref={svgRef} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {NODES.map((_, i) => (
          <g key={i}>
            <line ref={(el) => { if (el) linkRefs.current[i] = el; }} className="brain-link" />
            <line ref={(el) => { if (el) flowRefs.current[i] = el; }} className="brain-flow" />
          </g>
        ))}
      </svg>

      <div className="brain-orbit absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(var(--net),0.14)]" />
      <div className="brain-orbit reverse absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(var(--net),0.12)]" />

      <div className="brain-ring absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[7px]" />

      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 z-[3] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-card shadow-[0_0_0_1px_rgba(var(--net),0.3),0_30px_80px_rgba(5,12,40,0.7)]"
      >
        <img src="/Samuel.jpg" alt="Samuel Stefano" className="h-full w-full object-cover object-[center_18%]" />
      </div>

      {NODES.map((n, i) => (
        <div
          key={n.label}
          ref={(el) => { if (el) nodeRefs.current[i] = el; }}
          className="node absolute z-[4] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-card/85 px-3 py-2 font-mono text-[12.5px] font-semibold text-foreground shadow-[0_12px_30px_rgba(5,10,30,0.55)] backdrop-blur-sm transition-[box-shadow,border-color] duration-200 hover:border-[rgba(var(--net),0.6)] hover:shadow-[0_0_24px_rgba(var(--net),0.35)]"
          style={{ left: '50%', top: '50%', willChange: 'left, top' }}
        >
          <i className="block h-2.5 w-2.5 flex-shrink-0 rounded" style={{ background: n.color }} />
          {n.label}
          <small className="font-medium text-muted-foreground">· {n.sub}</small>
        </div>
      ))}
    </div>
  );
};

export default SecondBrain;
