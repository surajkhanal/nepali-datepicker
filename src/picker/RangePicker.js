import { compareBsDates, isBetweenBs, sameBsDate } from '../core/utils.js';
import { CalendarEngine } from './CalendarEngine.js';

export class RangePicker extends CalendarEngine {
  constructor(options = {}) {
    super(options);
    this.startDate = options.startDate || null;
    this.endDate = options.endDate || null;
    this.minRange = Number.isInteger(options.minRange) ? options.minRange : null;
    this.maxRange = Number.isInteger(options.maxRange) ? options.maxRange : null;
    this.onRangeChange = typeof options.onRangeChange === 'function' ? options.onRangeChange : null;
    this.hoveredDate = null;
    this.selectionPhase = this.startDate && this.endDate ? 'complete' : this.startDate ? 'start-selected' : 'idle';
    this.swapIfInverted();
  }

  getState() {
    const base = super.getState();
    const { startDate, endDate } = this;
    const hoverDate = this.hoveredDate;
    const selectionPhase = this.selectionPhase;

    let hoverStart = startDate;
    let hoverEnd = hoverDate;
    if (hoverStart && hoverEnd && compareBsDates(hoverStart, hoverEnd) > 0) {
      const tmp = hoverStart;
      hoverStart = hoverEnd;
      hoverEnd = tmp;
    }

    const weeks = base.weeks.map((row) =>
      row.map((cell) => {
        const isRangeStart = startDate ? sameBsDate(cell.date, startDate) : false;
        const isRangeEnd = endDate ? sameBsDate(cell.date, endDate) : false;
        const isInRange = startDate && endDate ? isBetweenBs(cell.date, startDate, endDate, '[]') : false;
        const isRangeHover =
          selectionPhase === 'start-selected' && hoverStart && hoverEnd
            ? isBetweenBs(cell.date, hoverStart, hoverEnd, '[]')
            : false;
        return { ...cell, isRangeStart, isRangeEnd, isInRange, isRangeHover };
      })
    );

    return {
      ...base,
      weeks,
      startDate,
      endDate,
      hoverDate,
      selectionPhase,
    };
  }

  hoverDate(nepaliDate) {
    if (this.selectionPhase !== 'start-selected') return;
    this.hoveredDate = nepaliDate;
    this._emit();
  }

  selectDate(nepaliDate) {
    if (!nepaliDate) return;
    if (this._isDateDisabled(nepaliDate)) return;
    if (this.selectionPhase === 'idle' || this.selectionPhase === 'complete') {
      this.startDate = nepaliDate;
      this.endDate = null;
      this.hoveredDate = null;
      this.selectionPhase = 'start-selected';
      this.viewYear = nepaliDate.year;
      this.viewMonth = nepaliDate.month;
      this._emit();
      return;
    }

    if (this.selectionPhase === 'start-selected') {
      const start = this.startDate;
      const end = nepaliDate;
      if (!start) return;
      const diff = Math.abs(start.diff(end, 'day'));
      if (this.minRange != null && diff < this.minRange) return;
      if (this.maxRange != null && diff > this.maxRange) return;
      this.endDate = end;
      this.hoveredDate = null;
      this.selectionPhase = 'complete';
      this.swapIfInverted();
      if (this.onRangeChange) this.onRangeChange({ start: this.startDate, end: this.endDate });
      this._emit();
    }
  }

  setRange(start, end) {
    this.startDate = start || null;
    this.endDate = end || null;
    this.selectionPhase = this.startDate && this.endDate ? 'complete' : this.startDate ? 'start-selected' : 'idle';
    this.swapIfInverted();
    if (this.onRangeChange && this.startDate && this.endDate) {
      this.onRangeChange({ start: this.startDate, end: this.endDate });
    }
    this._emit();
  }

  clearRange() {
    this.startDate = null;
    this.endDate = null;
    this.hoveredDate = null;
    this.selectionPhase = 'idle';
    this._emit();
  }

  swapIfInverted() {
    if (this.startDate && this.endDate && compareBsDates(this.startDate, this.endDate) > 0) {
      const tmp = this.startDate;
      this.startDate = this.endDate;
      this.endDate = tmp;
    }
  }
}
