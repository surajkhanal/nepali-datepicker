import { describe, it, expect } from 'vitest';
import NepaliDate from '../src/core/NepaliDate.js';
import { RangePicker } from '../src/picker/RangePicker.js';


describe('RangePicker', () => {
  it('selects start then end', () => {
    const picker = new RangePicker();
    const start = new NepaliDate(2080, 1, 1);
    const end = new NepaliDate(2080, 1, 5);
    picker.selectDate(start);
    expect(picker.selectionPhase).toBe('start-selected');
    picker.selectDate(end);
    expect(picker.selectionPhase).toBe('complete');
    expect(picker.startDate.year).toBe(2080);
    expect(picker.endDate.day).toBe(5);
  });

  it('swaps inverted selection', () => {
    const picker = new RangePicker();
    const start = new NepaliDate(2080, 1, 10);
    const end = new NepaliDate(2080, 1, 5);
    picker.setRange(start, end);
    expect(picker.startDate.day).toBe(5);
    expect(picker.endDate.day).toBe(10);
  });
});
