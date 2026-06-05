import { useEffect, useRef } from 'react';

type Node = {
  label: string;
  sub: string;
  color: string;
  a: number;
  phase: number;
  parallax: number;
};

// fixed angular slots 45° apart so nodes never cross or overlap each other
const NODES: Node[] = [
  { label: 'React',      sub: 'Frontend',   color: '#61dafb', a: -67.5, phase: 0.0, parallax: 1.5 },
  { label: 'TypeScript', sub: 'Language',   color: '#3178c6', a: -22.5, phase: 1.1, parallax: 1.0 },
  { label: 'Supabase',   sub: 'Backend',    color: '#3ecf8e', a: 22.5,  phase: 2.3, parallax: 1.8 },
  { label: 'Web3',       sub: 'Solidity',   color: '#a855f7', a: 67.5,  phase: 0.7, parallax: 1.2 },
  { label: 'Claude AI',  sub: 'LLM',        color: '#d97757', a: 112.5, phase: 3.4, parallax: 2.0 },
  { label: 'n8n',        sub: 'Automation', color: '#ea4b71', a: 157.5, phase: 1.8, parallax: 1.1 },
  { label: 'Next.js',    sub: 'Framework',  color: '#e8eaf0', a: 202.5, phase: 4.2, parallax: 1.7 },
  { label: 'Docker',     sub: 'DevOps',     color: '#2496ed', a: 247.5, phase: 2.9, parallax: 1.0 },
];

export const SecondBrain = () => {
  const brainRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const linkRefs = useRef<SVGLineElement[]>([]);
  const flowRefs = useRef<SVGLineElement[]>([]);
  const pinnedRef = useRef<({ x: number; y: number } | null)[]>(NODES.map(() => null));
  const draggingRef = useRef<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

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

    const applyPinned = (i: number, x: number, y: number, drawLink = true) => {
      const el = nodeRefs.current[i];
      if (el) {
        el.style.left = `${x.toFixed(1)}px`;
        el.style.top = `${y.toFixed(1)}px`;
        el.style.transform = 'translate(-50%,-50%) scale(1)';
        el.style.opacity = '1';
        el.style.zIndex = draggingRef.current === i ? '8' : '6';
      }
      if (!drawLink) return;
      const r = brain.getBoundingClientRect();
      const ccx = r.width / 2 + (cmx - 0.5) * 10, ccy = r.height / 2 + (cmy - 0.5) * 10;
      const line = linkRefs.current[i], flow = flowRefs.current[i];
      if (line) { line.setAttribute('x1', `${ccx.toFixed(1)}`); line.setAttribute('y1', `${ccy.toFixed(1)}`); line.setAttribute('x2', `${x.toFixed(1)}`); line.setAttribute('y2', `${y.toFixed(1)}`); line.style.opacity = '0.55'; }
      if (flow) { flow.setAttribute('x1', `${ccx.toFixed(1)}`); flow.setAttribute('y1', `${ccy.toFixed(1)}`); flow.setAttribute('x2', `${x.toFixed(1)}`); flow.setAttribute('y2', `${y.toFixed(1)}`); }
    };

    const onPointerMove = (e: PointerEvent) => {
      const i = draggingRef.current;
      if (i === null) return;
      const r = brain.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, e.clientX - r.left - offsetRef.current.x));
      const y = Math.max(0, Math.min(r.height, e.clientY - r.top - offsetRef.current.y));
      pinnedRef.current[i] = { x, y };
      if (reduce) applyPinned(i, x, y);
    };
    const onPointerUp = (e: PointerEvent) => {
      const i = draggingRef.current;
      if (i === null) return;
      const el = nodeRefs.current[i];
      el?.releasePointerCapture?.(e.pointerId);
      if (el) el.style.cursor = 'grab';
      draggingRef.current = null;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
    const onPointerDown = (i: number) => (e: PointerEvent) => {
      const el = nodeRefs.current[i];
      if (!el) return;
      draggingRef.current = i;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = 'grabbing';
      const r = el.getBoundingClientRect();
      offsetRef.current = { x: e.clientX - (r.left + r.width / 2), y: e.clientY - (r.top + r.height / 2) };
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };
    const downHandlers = NODES.map((_, i) => onPointerDown(i));
    nodeRefs.current.forEach((el, i) => el?.addEventListener('pointerdown', downHandlers[i]));

    const render = (t: number) => {
      const r = brain.getBoundingClientRect();
      const BW = r.width, BH = r.height, cx = BW / 2, cy = BH / 2;
      cmx += (tmx - cmx) * 0.07;
      cmy += (tmy - cmy) * 0.07;
      const narrow = BW < 480;
      // floors keep every node outside the centre photo so labels never cover the face
      const rx = Math.max(narrow ? 150 : 158, Math.min(BW * (narrow ? 0.38 : 0.44), 290));
      const ry = Math.max(narrow ? 186 : 178, Math.min(BH * (narrow ? 0.42 : 0.42), 236));
      const tm = (t || 0) / 1000;
      const ccx = cx + (cmx - 0.5) * 10, ccy = cy + (cmy - 0.5) * 10;

      NODES.forEach((n, i) => {
        const pin = pinnedRef.current[i];
        if (pin) { applyPinned(i, pin.x, pin.y); return; }
        const ang = (n.a * Math.PI) / 180 + Math.sin(tm * 0.3 + n.phase) * 0.06;
        const z = Math.sin(tm * 0.45 + n.phase);
        const scale = 0.82 + (z + 1) * 0.16;
        const opacity = 0.55 + (z + 1) * 0.225;
        const fx = Math.sin(tm * 0.6 + i) * 3;
        const fy = Math.cos(tm * 0.5 + i * 1.3) * 3;
        const px = (cmx - 0.5) * n.parallax * 22;
        const py = (cmy - 0.5) * n.parallax * 22;
        const x = cx + Math.cos(ang) * rx + fx + px;
        const y = cy + Math.sin(ang) * ry + fy + py;
        const el = nodeRefs.current[i];
        if (el) {
          el.style.left = `${x.toFixed(1)}px`;
          el.style.top = `${y.toFixed(1)}px`;
          el.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(3)})`;
          el.style.opacity = `${opacity.toFixed(3)}`;
          el.style.zIndex = `${4 + Math.round(z * 2)}`;
        }
        const line = linkRefs.current[i], flow = flowRefs.current[i];
        if (line) { line.setAttribute('x1', `${ccx.toFixed(1)}`); line.setAttribute('y1', `${ccy.toFixed(1)}`); line.setAttribute('x2', `${x.toFixed(1)}`); line.setAttribute('y2', `${y.toFixed(1)}`); line.style.opacity = `${(0.25 + (z + 1) * 0.25).toFixed(2)}`; }
        if (flow) { flow.setAttribute('x1', `${ccx.toFixed(1)}`); flow.setAttribute('y1', `${ccy.toFixed(1)}`); flow.setAttribute('x2', `${x.toFixed(1)}`); flow.setAttribute('y2', `${y.toFixed(1)}`); }
      });

      if (coreRef.current) {
        coreRef.current.style.transform = `translate(-50%,-50%) translate(${(cmx - 0.5) * 12}px,${(cmy - 0.5) * 12}px)`;
      }
      if (!reduce) raf = requestAnimationFrame(render);
    };

    let raf = 0;
    render(0);

    return () => {
      cancelAnimationFrame(raf);
      brain.removeEventListener('mousemove', onMove);
      brain.removeEventListener('mouseleave', onLeave);
      nodeRefs.current.forEach((el, i) => el?.removeEventListener('pointerdown', downHandlers[i]));
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
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
        ref={coreRef}
        className="absolute left-1/2 top-1/2 z-[3] h-[188px] w-[188px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-card shadow-[0_0_0_1px_rgba(var(--net),0.3),0_30px_80px_rgba(5,12,40,0.7)] sm:h-[248px] sm:w-[248px] lg:h-[280px] lg:w-[280px]"
      >
        <img src="/Samuel.jpg" alt="Samuel Stefano" className="h-full w-full object-cover object-[center_44%]" />
      </div>

      {NODES.map((n, i) => (
        <div
          key={n.label}
          ref={(el) => { if (el) nodeRefs.current[i] = el; }}
          className="node absolute z-[4] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-card/85 px-3 py-2 font-mono text-[12.5px] font-semibold text-foreground shadow-[0_12px_30px_rgba(5,10,30,0.55)] backdrop-blur-sm transition-[box-shadow,border-color] duration-200 hover:border-[rgba(var(--net),0.6)] hover:shadow-[0_0_24px_rgba(var(--net),0.35)]"
          style={{ left: '50%', top: '50%', cursor: 'grab', touchAction: 'none', willChange: 'left, top, transform, opacity' }}
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
