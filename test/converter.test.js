import { describe, it, expect } from 'vitest';
import { adToBS, bsToAD } from '../src/core/converter.js';

const adSamples = [
  { year: 1943, month: 4, day: 14 },
  { year: 1950, month: 1, day: 1 },
  { year: 2000, month: 1, day: 1 },
  { year: 2024, month: 1, day: 15 },
  { year: 2030, month: 12, day: 31 },
];

const bsSamples = [
  { year: 2000, month: 1, day: 1 },
  { year: 2050, month: 6, day: 15 },
  { year: 2080, month: 1, day: 1 },
  { year: 2090, month: 12, day: 30 },
  { year: 2100, month: 12, day: 30 },
];

describe('converter', () => {
  it('matches the anchor date', () => {
    const ad = bsToAD(2000, 1, 1);
    expect(ad).toEqual({ year: 1943, month: 4, day: 14 });
    const bs = adToBS(1943, 4, 14);
    expect(bs).toEqual({ year: 2000, month: 1, day: 1 });
  });

  it('round-trips AD -> BS -> AD', () => {
    for (const ad of adSamples) {
      const bs = adToBS(ad.year, ad.month, ad.day);
      const back = bsToAD(bs.year, bs.month, bs.day);
      expect(back).toEqual(ad);
    }
  });

  it('round-trips BS -> AD -> BS', () => {
    for (const bs of bsSamples) {
      const ad = bsToAD(bs.year, bs.month, bs.day);
      const back = adToBS(ad.year, ad.month, ad.day);
      expect(back).toEqual(bs);
    }
  });
});
