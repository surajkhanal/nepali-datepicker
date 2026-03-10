import { describe, it, expect } from 'vitest';
import NepaliDate from '../src/core/NepaliDate.js';
import { formatDate, parseDate } from '../src/core/locale.js';


describe('locale formatting', () => {
  it('formats English tokens', () => {
    const date = new NepaliDate(2081, 6, 15);
    expect(formatDate(date, 'YYYY-MM-DD', 'en')).toBe('2081-06-15');
  });

  it('formats Nepali numerals', () => {
    const date = new NepaliDate(2081, 6, 15);
    const formatted = formatDate(date, 'YYYY-MM-DD', 'np');
    expect(formatted).toContain('२०८१');
  });

  it('parses formatted date', () => {
    const parsed = parseDate('2081-06-15', 'YYYY-MM-DD', 'en');
    expect(parsed.year).toBe(2081);
    expect(parsed.month).toBe(6);
    expect(parsed.day).toBe(15);
  });
});
