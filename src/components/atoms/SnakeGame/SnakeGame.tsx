import { useEffect, useRef, useState } from 'react';
import { X, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CELLS = 17;
const SPEED_MS = 110;

type Pt = { x: number; y: number };
type Dir = 'up' | 'down' | 'left' | 'right';

const DIRS: Record<Dir, Pt> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

const randFood = (snake: Pt[]): Pt => {
  while (true) {
    const f = { x: Math.floor(Math.random() * CELLS), y: Math.floor(Math.random() * CELLS) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
};

interface SnakeGameProps {
  onClose: () => void;
}

export const SnakeGame = ({ onClose }: SnakeGameProps) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);

  const stateRef = useRef({
    snake: [{ x: 8, y: 8 }] as Pt[],
    dir: 'right' as Dir,
    nextDir: 'right' as Dir,
    food: randFood([{ x: 8, y: 8 }]),
  });

  const reset = () => {
    stateRef.current = {
      snake: [{ x: 8, y: 8 }],
      dir: 'right',
      nextDir: 'right',
      food: randFood([{ x: 8, y: 8 }]),
    };
    setScore(0);
    setOver(false);
    setStarted(false);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const turn = (d: Dir) => {
      const st = stateRef.current;
      if (d !== OPPOSITE[st.dir]) st.nextDir = d;
      setStarted(true);
    };

    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
      };
      if (e.key === 'Escape') return onClose();
      const d = map[e.key];
      if (d) { e.preventDefault(); turn(d); }
    };

    let touchStart: Pt | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchStart) return;
      const dx = e.touches[0].clientX - touchStart.x;
      const dy = e.touches[0].clientY - touchStart.y;
      if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
      if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 'right' : 'left');
      else turn(dy > 0 ? 'down' : 'up');
      touchStart = null;
    };

    window.addEventListener('keydown', onKey);
    const cv = canvasRef.current;
    cv?.addEventListener('touchstart', onTouchStart, { passive: true });
    cv?.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      cv?.removeEventListener('touchstart', onTouchStart);
      cv?.removeEventListener('touchmove', onTouchMove);
    };
  }, [onClose]);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const primary = `hsl(${css.getPropertyValue('--primary').trim()})`;
    const border = `hsl(${css.getPropertyValue('--border').trim()})`;

    const cell = cv.width / CELLS;
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    let gameOver = false;

    const step = () => {
      const st = stateRef.current;
      st.dir = st.nextDir;
      const head = st.snake[0];
      const nh = { x: head.x + DIRS[st.dir].x, y: head.y + DIRS[st.dir].y };
      if (
        nh.x < 0 || nh.y < 0 || nh.x >= CELLS || nh.y >= CELLS ||
        st.snake.some((s) => s.x === nh.x && s.y === nh.y)
      ) {
        gameOver = true;
        setOver(true);
        setBest((b) => Math.max(b, st.snake.length - 1));
        return;
      }
      st.snake.unshift(nh);
      if (nh.x === st.food.x && nh.y === st.food.y) {
        st.food = randFood(st.snake);
        setScore((s) => s + 1);
      } else {
        st.snake.pop();
      }
    };

    const render = (now: number) => {
      const st = stateRef.current;
      ctx.clearRect(0, 0, cv.width, cv.height);

      ctx.strokeStyle = border;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      for (let i = 1; i < CELLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, cv.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(cv.width, i * cell); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const pulse = 0.6 + 0.4 * Math.sin(now / 200);
      ctx.fillStyle = primary;
      ctx.globalAlpha = pulse;
      ctx.beginPath();
      ctx.arc(st.food.x * cell + cell / 2, st.food.y * cell + cell / 2, cell * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const centers = st.snake.map((s) => ({ x: s.x * cell + cell / 2, y: s.y * cell + cell / 2 }));
      const bodyW = cell * 0.74;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      if (centers.length > 1) {
        ctx.strokeStyle = primary;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = bodyW + 6;
        ctx.beginPath();
        centers.forEach((c, i) => (i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y)));
        ctx.stroke();

        ctx.strokeStyle = primary;
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = bodyW;
        ctx.beginPath();
        centers.forEach((c, i) => (i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y)));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const head = centers[0];
      const dir = DIRS[st.dir];
      ctx.fillStyle = primary;
      ctx.beginPath();
      ctx.arc(head.x, head.y, bodyW / 2 + 1.5, 0, Math.PI * 2);
      ctx.fill();

      const eyeOff = bodyW * 0.18;
      const eyeFwd = bodyW * 0.12;
      const perp = { x: -dir.y, y: dir.x };
      ctx.fillStyle = '#0b1020';
      [1, -1].forEach((sgn) => {
        ctx.beginPath();
        ctx.arc(
          head.x + dir.x * eyeFwd + perp.x * eyeOff * sgn,
          head.y + dir.y * eyeFwd + perp.y * eyeOff * sgn,
          Math.max(1.4, bodyW * 0.1),
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      render(now);
      if (gameOver || over) return;
      if (!started) { last = now; return; }
      acc += now - last;
      last = now;
      while (acc >= SPEED_MS) { acc -= SPEED_MS; step(); if (gameOver) break; }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started, over]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm animate-fade-up"
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-primary/30 bg-card p-5 shadow-[0_30px_90px_-20px_hsl(var(--primary))]">
        <button
          onClick={onClose}
          aria-label={t('game.close')}
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-3 flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm font-bold text-primary">{t('game.title')}</span>
          <span className="ml-auto flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{t('game.score')}: <b className="text-foreground">{score}</b></span>
            <span>{t('game.best')}: <b className="text-foreground">{best}</b></span>
          </span>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-border bg-background/60">
          <canvas ref={canvasRef} width={340} height={340} className="block w-full touch-none" />
          {(!started || over) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 text-center">
              {over && <div className="font-mono text-lg font-bold text-primary">{t('game.gameOver')}</div>}
              <div className="px-6 text-xs text-muted-foreground">{over ? t('game.hint') : t('game.start')}</div>
              {over && (
                <button
                  onClick={reset}
                  className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  {t('game.restart')}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 text-center font-mono text-[11px] text-muted-foreground">{t('game.hint')}</div>
      </div>
    </div>
  );
};

export default SnakeGame;
