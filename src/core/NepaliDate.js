import { adToBS, bsToAD } from './converter.js';
import { formatDate, parseDate } from './locale.js';
import {
  assert,
  assertInteger,
  assertNumber,
  clampDay,
  compareBsDates,
  diffDaysUTC,
  getDaysInMonth,
  getDaysInYear,
  isBetweenBs,
  isValidBsDate,
  isValidBsYear,
  normalizeUnit,
  sameBsDate,
} from './utils.js';

class NepaliDate {
  constructor(bsYear, bsMonth, bsDay) {
    assertInteger(bsYear, 'year');
    assertInteger(bsMonth, 'month');
    assertInteger(bsDay, 'day');
    assert(isValidBsYear(bsYear), `BS year out of range`);
    assert(isValidBsDate(bsYear, bsMonth, bsDay), 'Invalid BS date');
    this._year = bsYear;
    this._month = bsMonth;
    this._day = bsDay;
    Object.freeze(this);
  }

  static fromAD(jsDate) {
    assert(jsDate instanceof Date && !Number.isNaN(jsDate.getTime()), 'Invalid JS Date');
    const ad = {
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      day: jsDate.getDate(),
    };
    const bs = adToBS(ad.year, ad.month, ad.day);
    return new NepaliDate(bs.year, bs.month, bs.day);
  }

  static parse(str, formatStr = 'YYYY-MM-DD', locale = 'en') {
    return parseDate(str, formatStr, locale);
  }

  static today() {
    return NepaliDate.fromAD(new Date());
  }

  static fromTimestamp(ms) {
    assertNumber(ms, 'timestamp');
    return NepaliDate.fromAD(new Date(ms));
  }

  get year() {
    return this._year;
  }

  get month() {
    return this._month;
  }

  get day() {
    return this._day;
  }

  get weekDay() {
    return this.toAD().getDay();
  }

  get quarter() {
    return Math.floor((this._month - 1) / 3) + 1;
  }

  get dayOfYear() {
    let days = 0;
    for (let m = 1; m < this._month; m += 1) days += getDaysInMonth(this._year, m);
    return days + this._day;
  }

  get weekOfYear() {
    return Math.floor((this.dayOfYear - 1) / 7) + 1;
  }

  get daysInMonth() {
    return getDaysInMonth(this._year, this._month);
  }

  get daysInYear() {
    return getDaysInYear(this._year);
  }

  get isLeapYear() {
    return this.daysInYear === 366;
  }

  toAD() {
    const ad = bsToAD(this._year, this._month, this._day);
    return new Date(ad.year, ad.month - 1, ad.day);
  }

  toObject() {
    return {
      year: this._year,
      month: this._month,
      day: this._day,
      weekDay: this.weekDay,
    };
  }

  toTimestamp() {
    return this.toAD().getTime();
  }

  format(formatStr = 'YYYY-MM-DD', locale = 'en') {
    return formatDate(this, formatStr, locale);
  }

  add(value, unit) {
    assertInteger(value, 'value');
    const u = normalizeUnit(unit);
    if (u === 'day' || u === 'week') {
      const days = u === 'week' ? value * 7 : value;
      const ad = this.toAD();
      const next = new Date(ad.getTime() + days * 86400000);
      return NepaliDate.fromAD(next);
    }
    if (u === 'month') {
      const total = (this._year * 12 + (this._month - 1)) + value;
      const newYear = Math.floor(total / 12);
      const newMonth = ((total % 12) + 12) % 12 + 1;
      const newDay = clampDay(newYear, newMonth, this._day);
      return new NepaliDate(newYear, newMonth, newDay);
    }
    if (u === 'year') {
      const newYear = this._year + value;
      const newDay = clampDay(newYear, this._month, this._day);
      return new NepaliDate(newYear, this._month, newDay);
    }
    throw new Error('[NepaliDate] Invalid unit');
  }

  subtract(value, unit) {
    return this.add(-value, unit);
  }

  startOf(unit) {
    const u = normalizeUnit(unit);
    if (u === 'month') return new NepaliDate(this._year, this._month, 1);
    if (u === 'year') return new NepaliDate(this._year, 1, 1);
    if (u === 'week') return this.subtract(this.weekDay, 'day');
    throw new Error('[NepaliDate] Invalid unit');
  }

  endOf(unit) {
    const u = normalizeUnit(unit);
    if (u === 'month') return new NepaliDate(this._year, this._month, this.daysInMonth);
    if (u === 'year') return new NepaliDate(this._year, 12, getDaysInMonth(this._year, 12));
    if (u === 'week') return this.add(6 - this.weekDay, 'day');
    throw new Error('[NepaliDate] Invalid unit');
  }

  addDays(n) {
    return this.add(n, 'day');
  }

  addMonths(n) {
    return this.add(n, 'month');
  }

  addYears(n) {
    return this.add(n, 'year');
  }

  subtractDays(n) {
    return this.subtract(n, 'day');
  }

  subtractMonths(n) {
    return this.subtract(n, 'month');
  }

  subtractYears(n) {
    return this.subtract(n, 'year');
  }

  isBefore(other) {
    return compareBsDates(this, other) < 0;
  }

  isAfter(other) {
    return compareBsDates(this, other) > 0;
  }

  isSame(other, granularity = 'day') {
    const u = normalizeUnit(granularity);
    if (u === 'year') return this._year === other.year;
    if (u === 'month') return this._year === other.year && this._month === other.month;
    return sameBsDate(this, other);
  }

  isBetween(start, end, inclusive = '[]') {
    return isBetweenBs(this, start, end, inclusive);
  }

  isToday() {
    return this.isSame(NepaliDate.today());
  }

  isWeekend() {
    return this.weekDay === 6;
  }

  isValid() {
    return isValidBsDate(this._year, this._month, this._day);
  }

  diff(other, unit = 'day') {
    const u = normalizeUnit(unit);
    if (u === 'day' || u === 'week') {
      const adA = { year: this.toAD().getFullYear(), month: this.toAD().getMonth() + 1, day: this.toAD().getDate() };
      const adB = { year: other.toAD().getFullYear(), month: other.toAD().getMonth() + 1, day: other.toAD().getDate() };
      const days = diffDaysUTC(adA, adB);
      return u === 'week' ? days / 7 : days;
    }
    if (u === 'month') {
      let months = (this._year - other.year) * 12 + (this._month - other.month);
      if (months > 0 && this._day < other.day) months -= 1;
      if (months < 0 && this._day > other.day) months += 1;
      return months;
    }
    if (u === 'year') {
      let years = this._year - other.year;
      if (years > 0) {
        if (this._month < other.month || (this._month === other.month && this._day < other.day)) years -= 1;
      }
      if (years < 0) {
        if (this._month > other.month || (this._month === other.month && this._day > other.day)) years += 1;
      }
      return years;
    }
    throw new Error('[NepaliDate] Invalid unit');
  }

  clone() {
    return new NepaliDate(this._year, this._month, this._day);
  }

  set(field, value) {
    assertInteger(value, field);
    if (field === 'year') return new NepaliDate(value, this._month, clampDay(value, this._month, this._day));
    if (field === 'month') return new NepaliDate(this._year, value, clampDay(this._year, value, this._day));
    if (field === 'day') return new NepaliDate(this._year, this._month, value);
    throw new Error('[NepaliDate] Invalid field');
  }
}

export default NepaliDate;
export { NepaliDate };
