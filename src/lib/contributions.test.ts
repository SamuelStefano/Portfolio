import { describe, expect, it } from 'vitest';
import { levelFor, levelThresholds, summarize, toDays, toWeeks } from './contributions';

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
