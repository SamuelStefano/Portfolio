import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInView } from '@/hooks/useInView';
import {
  levelFor,
  levelThresholds,
  monthLabelColumns,
  summarize,
  toDays,
  toWeeks,
  type ContributionDay,
} from '@/lib/contributions';
import { cn } from '@/lib/utils';
import type { GitHubContributions } from '@/hooks/useGitHubStats';

const WEEKS = 26;

const LEVEL_CLASS = [
  'bg-muted/60',
  'bg-primary/25',
  'bg-primary/45',
  'bg-primary/70',
  'bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.55)]',
] as const;

interface ContributionHeatmapProps {
  contributions: GitHubContributions;
}

interface Hovered {
  day: ContributionDay;
  x: number;
  y: number;
}

/** Last six months of GitHub activity, drawn like GitHub's calendar; cells fade in column by column. */
export const ContributionHeatmap = ({ contributions }: ContributionHeatmapProps) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'pt').slice(0, 2);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const shown = useInView(rootRef, 0.25, true);
  const [hovered, setHovered] = useState<Hovered | null>(null);

  // on narrow screens the grid scrolls; start at the most recent week
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const { weeks, flat, thresholds, summary } = useMemo(() => {
    const allDays = contributions.start ? toDays(contributions.start, contributions.counts) : [];
    const recent = toWeeks(allDays).slice(-WEEKS);
    const recentDays = recent.flat();
    return {
      weeks: recent,
      flat: recentDays,
      thresholds: levelThresholds(recentDays.map((d) => d.count)),
      summary: summarize(recentDays),
    };
  }, [contributions]);

  const fmt = useMemo(
    () => ({
      number: new Intl.NumberFormat(lang),
      month: new Intl.DateTimeFormat(lang, { month: 'short', timeZone: 'UTC' }),
      day: new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }),
      weekday: new Intl.DateTimeFormat(lang, { weekday: 'short', timeZone: 'UTC' }),
    }),
    [lang],
  );

  if (weeks.length === 0) return null;

  const labelled = new Set(monthLabelColumns(weeks));
  const monthLabels = weeks.map((week, wi) =>
    labelled.has(wi) ? fmt.month.format(new Date(`${week[0].date}T00:00:00Z`)).replace('.', '') : '',
  );

  // Sunday-first rows; label Mon / Wed / Fri like GitHub does
  const weekdayLabels = [1, 3, 5].map((row) => ({
    row,
    label: fmt.weekday.format(new Date(Date.UTC(2023, 0, 1 + row))).replace('.', ''),
  }));

  const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const index = target.dataset.i;
    if (index === undefined) return;
    const host = e.currentTarget.getBoundingClientRect();
    const cell = target.getBoundingClientRect();
    setHovered({ day: flat[Number(index)], x: cell.left - host.left + cell.width / 2, y: cell.top - host.top });
  };

  const tooltip = (day: ContributionDay) => {
    const date = fmt.day.format(new Date(`${day.date}T00:00:00Z`));
    return day.count === 0
      ? t('about.activity.none', { date })
      : t('about.activity.day', { count: day.count, date, formatted: fmt.number.format(day.count) });
  };

  return (
    <div
      ref={rootRef}
      className="heatmap rounded-xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:border-primary/40"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-primary/10 p-2">
            <Github className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{t('about.activity.title')}</p>
            <p className="text-xs text-muted-foreground">{t('about.activity.subtitle')}</p>
          </div>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-lg font-bold leading-none gradient-text">{fmt.number.format(summary.total)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{t('about.activity.contributions')}</p>
          </div>
          <div>
            <p className="text-lg font-bold leading-none gradient-text">{fmt.number.format(summary.activeDays)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{t('about.activity.activeDays')}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-fit max-w-full gap-2">
        <div
          aria-hidden
          className="heat-weekdays grid shrink-0 gap-[3px] pt-5 text-[10px] leading-none text-muted-foreground"
          style={{ gridTemplateRows: 'repeat(7, var(--cell))' }}
        >
          {weekdayLabels.map(({ row, label }) => (
            <span key={row} style={{ gridRow: row + 1 }} className="flex items-center">
              {label}
            </span>
          ))}
        </div>

        <div ref={scrollerRef} className="min-w-0 flex-1 overflow-x-auto scrollbar-none">
          <div
            className="relative"
            onMouseOver={onMouseOver}
            onMouseLeave={() => setHovered(null)}
            style={{ width: `calc(${weeks.length} * (var(--cell) + 3px))` } as CSSProperties}
          >
            <div aria-hidden className="relative h-5 text-[10px] text-muted-foreground">
              {monthLabels.map((label, wi) =>
                label ? (
                  <span
                    key={wi}
                    className="absolute top-0 whitespace-nowrap"
                    style={{ left: `calc(${wi} * (var(--cell) + 3px))` }}
                  >
                    {label}
                  </span>
                ) : null,
              )}
            </div>

            <div
              role="img"
              aria-label={t('about.activity.aria', { count: summary.total, days: summary.activeDays })}
              className={cn('heat-grid grid grid-flow-col gap-[3px]', shown && 'heat-shown')}
              style={{
                gridTemplateRows: 'repeat(7, var(--cell))',
                gridTemplateColumns: `repeat(${weeks.length}, var(--cell))`,
              }}
            >
              {weeks.map((week, wi) =>
                week.map((day, di) => {
                  // every week but the last is complete, so the flat index is wi * 7 + di
                  const dayIndex = wi * 7 + di;
                  const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
                  return (
                    <span
                      key={day.date}
                      data-i={dayIndex}
                      className={cn(
                        'heat-cell rounded-[3px] transition-transform duration-150 hover:scale-125',
                        LEVEL_CLASS[levelFor(day.count, thresholds)],
                      )}
                      style={{ gridColumn: wi + 1, gridRow: weekday + 1, animationDelay: `${wi * 18}ms` }}
                    />
                  );
                }),
              )}
            </div>

            {hovered && (
              <div
                role="tooltip"
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-[11px] text-foreground shadow-lg"
                style={{ left: hovered.x, top: hovered.y - 6 }}
              >
                {tooltip(hovered.day)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>{t('about.activity.less')}</span>
        {LEVEL_CLASS.map((cls, i) => (
          <span key={i} className={cn('h-2.5 w-2.5 rounded-[2px]', cls)} />
        ))}
        <span>{t('about.activity.more')}</span>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
