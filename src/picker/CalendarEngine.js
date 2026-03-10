import NepaliDate from '../core/NepaliDate.js';
import { LOCALES } from '../core/locale.js';
import { BS_CALENDAR_DATA } from '../core/calendar-data.js';
import { compareBsDates, sameBsDate } from '../core/utils.js';

function resolveLocale(locale) {
  return LOCALES[locale] ? locale : 'en';
}

function toDisabledWeekdays(disabledDays, locale) {
  if (!disabledDays || !disabledDays.length) return new Set();
  const loc = LOCALES[locale];
  return new Set(
    disabledDays
      .map((d) => {
        if (typeof d !== 'string') return null;
        const idxShort = loc.days.findIndex((x) => x.toLowerCase() === d.toLowerCase());
        if (idxShort >= 0) return idxShort;
        const idxLong = loc.daysLong.findIndex((x) => x.toLowerCase() === d.toLowerCase());
        if (idxLong >= 0) return idxLong;
        return null;
      })
      .filter((v) => v != null)
  );
}

function isDateDisabled(date, { minDate, maxDate, disabledWeekdays, disabledDates }) {
  if (minDate && compareBsDates(date, minDate) < 0) return true;
  if (maxDate && compareBsDates(date, maxDate) > 0) return true;
  if (disabledWeekdays && disabledWeekdays.has(date.weekDay)) return true;
  if (disabledDates && disabledDates.length) {
    for (const d of disabledDates) {
      if (sameBsDate(date, d)) return true;
    }
  }
  return false;
}

const BS_YEARS = Object.keys(BS_CALENDAR_DATA).map(Number).sort((a, b) => a - b);
const BS_MIN_YEAR = BS_YEARS[0];
const BS_MAX_YEAR = BS_YEARS[BS_YEARS.length - 1];

export class CalendarEngine {
  constructor(options = {}) {
    this.options = { ...options };
    this.locale = resolveLocale(options.locale);
    this.weekStartsOn = Number.isInteger(options.weekStartsOn) ? options.weekStartsOn : 0;
    this.disabledWeekdays = toDisabledWeekdays(options.disabledDays, this.locale);
    this.disabledDates = options.disabledDates || [];
    this.minDate = options.minDate || null;
    this.maxDate = options.maxDate || null;
    this.onChange = typeof options.onChange === 'function' ? options.onChange : null;
    this.onMonthChange = typeof options.onMonthChange === 'function' ? options.onMonthChange : null;

    this.selectedDate = options.value || null;
    const baseDate = options.defaultDate || this.selectedDate || NepaliDate.today();
    this.viewYear = baseDate.year;
    this.viewMonth = baseDate.month;
    this.viewMode = 'day';

    this.listeners = new Set();
  }

  getState() {
    const loc = LOCALES[this.locale];
    const today = NepaliDate.today();
    const firstDay = new NepaliDate(this.viewYear, this.viewMonth, 1);
    const firstWeekDay = firstDay.weekDay;
    const offset = (firstWeekDay - this.weekStartsOn + 7) % 7;
    const totalCells = 42;
    const weeks = [];
    let row = [];

    for (let i = 0; i < totalCells; i += 1) {
      const dayOffset = i - offset;
      const cellDate = firstDay.addDays(dayOffset);
      const isOutsideMonth = cellDate.month !== this.viewMonth || cellDate.year !== this.viewYear;
      const isDisabled = isDateDisabled(cellDate, {
        minDate: this.minDate,
        maxDate: this.maxDate,
        disabledWeekdays: this.disabledWeekdays,
        disabledDates: this.disabledDates,
      });

      const cell = {
        date: cellDate,
        label: loc.numberFormat(cellDate.day),
        isToday: sameBsDate(cellDate, today),
        isSelected: this.selectedDate ? sameBsDate(cellDate, this.selectedDate) : false,
        isDisabled,
        isOutsideMonth,
        weekDay: cellDate.weekDay,
      };
      row.push(cell);
      if (row.length === 7) {
        weeks.push(row);
        row = [];
      }
    }

    const months = loc.months.map((label, index) => ({
      index: index + 1,
      label,
      isSelected: this.selectedDate
        ? this.selectedDate.year === this.viewYear && this.selectedDate.month === index + 1
        : false,
      isCurrent: this.viewMonth === index + 1,
    }));

    const decadeStart = Math.floor(this.viewYear / 10) * 10;
    const years = [];
    for (let i = -1; i < 11; i += 1) {
      const year = decadeStart + i;
      years.push({
        year,
        isSelected: this.selectedDate ? this.selectedDate.year === year : false,
        isCurrent: today.year === year,
      });
    }

    const prevMonth = this._getPrevMonth();
    const nextMonth = this._getNextMonth();
    const canGoBack = !!prevMonth && (!this.minDate || compareBsDates(prevMonth.last, this.minDate) >= 0);
    const canGoForward = !!nextMonth && (!this.maxDate || compareBsDates(nextMonth.first, this.maxDate) <= 0);

    return {
      viewYear: this.viewYear,
      viewMonth: this.viewMonth,
      viewMode: this.viewMode,
      weeks,
      months,
      years,
      selectedDate: this.selectedDate,
      todayDate: today,
      locale: this.locale,
      canGoBack,
      canGoForward,
    };
  }

  _getPrevMonth() {
    let year = this.viewYear;
    let month = this.viewMonth - 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
    if (year < BS_MIN_YEAR) return null;
    const first = new NepaliDate(year, month, 1);
    const last = new NepaliDate(year, month, first.daysInMonth);
    return { year, month, first, last };
  }

  _getNextMonth() {
    let year = this.viewYear;
    let month = this.viewMonth + 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    if (year > BS_MAX_YEAR) return null;
    const first = new NepaliDate(year, month, 1);
    const last = new NepaliDate(year, month, first.daysInMonth);
    return { year, month, first, last };
  }

  _emit() {
    const state = this.getState();
    for (const listener of this.listeners) listener(state);
  }

  _isDateDisabled(date) {
    return isDateDisabled(date, {
      minDate: this.minDate,
      maxDate: this.maxDate,
      disabledWeekdays: this.disabledWeekdays,
      disabledDates: this.disabledDates,
    });
  }

  goToPrevMonth() {
    const prev = this._getPrevMonth();
    if (!prev) return;
    if (this.minDate && compareBsDates(prev.last, this.minDate) < 0) return;
    this.viewYear = prev.year;
    this.viewMonth = prev.month;
    if (this.onMonthChange) this.onMonthChange({ year: this.viewYear, month: this.viewMonth });
    this._emit();
  }

  goToNextMonth() {
    const next = this._getNextMonth();
    if (!next) return;
    if (this.maxDate && compareBsDates(next.first, this.maxDate) > 0) return;
    this.viewYear = next.year;
    this.viewMonth = next.month;
    if (this.onMonthChange) this.onMonthChange({ year: this.viewYear, month: this.viewMonth });
    this._emit();
  }

  goToPrevYear() {
    const year = this.viewYear - 1;
    if (year < BS_MIN_YEAR) return;
    const first = new NepaliDate(year, this.viewMonth, 1);
    if (this.minDate && compareBsDates(first, this.minDate) < 0) return;
    this.viewYear = year;
    if (this.onMonthChange) this.onMonthChange({ year: this.viewYear, month: this.viewMonth });
    this._emit();
  }

  goToNextYear() {
    const year = this.viewYear + 1;
    if (year > BS_MAX_YEAR) return;
    const last = new NepaliDate(year, this.viewMonth, 1).endOf('month');
    if (this.maxDate && compareBsDates(last, this.maxDate) > 0) return;
    this.viewYear = year;
    if (this.onMonthChange) this.onMonthChange({ year: this.viewYear, month: this.viewMonth });
    this._emit();
  }

  goToMonth(year, month) {
    if (year < BS_MIN_YEAR || year > BS_MAX_YEAR) return;
    const first = new NepaliDate(year, month, 1);
    if (this.minDate && compareBsDates(first.endOf('month'), this.minDate) < 0) return;
    if (this.maxDate && compareBsDates(first, this.maxDate) > 0) return;
    this.viewYear = year;
    this.viewMonth = month;
    if (this.onMonthChange) this.onMonthChange({ year: this.viewYear, month: this.viewMonth });
    this._emit();
  }

  goToToday() {
    const today = NepaliDate.today();
    this.viewYear = today.year;
    this.viewMonth = today.month;
    this._emit();
  }

  setViewMode(mode) {
    if (!['day', 'month', 'year'].includes(mode)) return;
    this.viewMode = mode;
    this._emit();
  }

  selectDate(nepaliDate) {
    if (!nepaliDate) return;
    if (this._isDateDisabled(nepaliDate)) return;
    this.selectedDate = nepaliDate;
    this.viewYear = nepaliDate.year;
    this.viewMonth = nepaliDate.month;
    if (this.onChange) this.onChange(nepaliDate);
    this._emit();
  }

  clearSelection() {
    this.selectedDate = null;
    this._emit();
  }

  setValue(nepaliDate) {
    this.selectedDate = nepaliDate;
    if (nepaliDate) {
      this.viewYear = nepaliDate.year;
      this.viewMonth = nepaliDate.month;
    }
    this._emit();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  destroy() {
    this.listeners.clear();
  }
}
