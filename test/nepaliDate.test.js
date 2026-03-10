import { describe, it, expect } from 'vitest';
import NepaliDate from '../src/core/NepaliDate.js';


describe('NepaliDate arithmetic', () => {
  it('clamps month overflow', () => {
    const date = new NepaliDate(2080, 1, 31);
    const next = date.addMonths(1);
    const expectedDay = new NepaliDate(2080, 2, 1).daysInMonth;
    expect(next.year).toBe(2080);
    expect(next.month).toBe(2);
    expect(next.day).toBe(expectedDay);
  });

  it('crosses year boundary with day add', () => {
    const date = new NepaliDate(2080, 12, 30);
    const next = date.addDays(1);
    expect(next.year).toBe(2081);
    expect(next.month).toBe(1);
    expect(next.day).toBe(1);
  });

  it('supports startOf/endOf', () => {
    const date = new NepaliDate(2080, 5, 10);
    expect(date.startOf('month').day).toBe(1);
    expect(date.endOf('month').day).toBe(date.daysInMonth);
  });
});


describe('NepaliDate comparison', () => {
  it('compares correctly', () => {
    const a = new NepaliDate(2080, 1, 1);
    const b = new NepaliDate(2080, 1, 2);
    expect(a.isBefore(b)).toBe(true);
    expect(b.isAfter(a)).toBe(true);
    expect(a.isSame(b)).toBe(false);
    expect(a.diff(b, 'day')).toBe(-1);
  });
});
