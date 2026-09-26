export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionSummary {
  total: number;
  activeDays: number;
  longestStreak: number;
}

const DAY_MS = 86_400_000;

const isoDay = (time: number) => new Date(time).toISOString().slice(0, 10);

/** Expands the compact API calendar (first day + one count per day) into dated days. */
export const toDays = (start: string, counts: number[]): ContributionDay[] => {
  const first = Date.parse(`${start}T00:00:00Z`);
  return counts.map((count, i) => ({ date: isoDay(first + i * DAY_MS), count }));
};

/** Columns of seven days (Sunday first), the way GitHub lays the calendar out. */
export const toWeeks = (days: ContributionDay[]): ContributionDay[][] => {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
};

/**
 * Colour thresholds from the quartiles of the non-zero days. A linear scale would paint
 * everything pale next to one 400-commit day; quartiles keep ordinary days readable.
 */
export const levelThresholds = (counts: number[]): [number, number, number] => {
  const active = counts.filter((c) => c > 0).sort((a, b) => a - b);
  if (active.length === 0) return [1, 1, 1];
  const at = (q: number) => active[Math.min(active.length - 1, Math.floor(q * active.length))];
  return [at(0.25), at(0.5), at(0.75)];
};

/** 0 = no activity, 1..4 = quartile the day falls into. */
export const levelFor = (count: number, [q1, q2, q3]: [number, number, number]): 0 | 1 | 2 | 3 | 4 => {
  if (count <= 0) return 0;
  if (count <= q1) return 1;
  if (count <= q2) return 2;
  if (count <= q3) return 3;
  return 4;
};

export const summarize = (days: ContributionDay[]): ContributionSummary => {
  let longestStreak = 0;
  let streak = 0;
  let total = 0;
  let activeDays = 0;
  for (const day of days) {
    total += day.count;
    if (day.count > 0) {
      activeDays += 1;
      streak += 1;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 0;
    }
  }
  return { total, activeDays, longestStreak };
};
