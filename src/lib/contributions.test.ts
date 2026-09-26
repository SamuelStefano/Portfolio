import { describe, expect, it } from 'vitest';
import { levelFor, levelThresholds, monthLabelColumns, summarize, toDays, toWeeks } from './contributions';

describe('toDays', () => {
  it('dates every count from the first day, across month boundaries', () => {
    const days = toDays('2025-09-29', [1, 0, 3]);
    expect(days).toEqual([
      { date: '2025-09-29', count: 1 },
      { date: '2025-09-30', count: 0 },
      { date: '2025-10-01', count: 3 },
    ]);
  });
});

describe('toWeeks', () => {
  it('groups days into columns of seven and keeps a partial last week', () => {
    const weeks = toWeeks(toDays('2025-09-21', Array.from({ length: 10 }, () => 1)));
    expect(weeks).toHaveLength(2);
    expect(weeks[0]).toHaveLength(7);
    expect(weeks[1]).toHaveLength(3);
  });
});

describe('levelThresholds / levelFor', () => {
  it('uses quartiles of active days so one huge day does not wash the rest out', () => {
    const counts = [0, 0, 1, 2, 3, 4, 5, 6, 7, 472];
    const thresholds = levelThresholds(counts);
    expect(thresholds).toEqual([3, 5, 7]);
    expect(levelFor(0, thresholds)).toBe(0);
    expect(levelFor(2, thresholds)).toBe(1);
    expect(levelFor(5, thresholds)).toBe(2);
    expect(levelFor(7, thresholds)).toBe(3);
    expect(levelFor(472, thresholds)).toBe(4);
  });

  it('handles a calendar with no activity at all', () => {
    const thresholds = levelThresholds([0, 0, 0]);
    expect(levelFor(0, thresholds)).toBe(0);
  });
});

describe('summarize', () => {
  it('counts total, active days and the longest run of active days', () => {
    const days = toDays('2026-01-01', [1, 2, 0, 5, 5, 5, 0, 1]);
    expect(summarize(days)).toEqual({ total: 19, activeDays: 6, longestStreak: 3 });
  });
});

describe('monthLabelColumns', () => {
  it('labels the first week of each month and skips a month that only owns column 0', () => {
    // 2026-03-29 (Sun) … eight weeks: Mar 29 | Apr 5,12,19,26 | May 3,10,17
    const weeks = toWeeks(toDays('2026-03-29', Array.from({ length: 56 }, () => 0)));
    expect(monthLabelColumns(weeks)).toEqual([1, 5]);
  });

  it('drops a label that would collide with the previous one', () => {
    const weeks = toWeeks(toDays('2026-04-05', Array.from({ length: 35 }, () => 0)));
    // Apr 5,12,19,26 | May 3 -> April at 0, May at 4
    expect(monthLabelColumns(weeks, 5)).toEqual([0]);
    expect(monthLabelColumns(weeks, 3)).toEqual([0, 4]);
  });
});
