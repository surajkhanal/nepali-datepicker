import { BS_CALENDAR_DATA } from './calendar-data.js';

const ERR_PREFIX = '[NepaliDate]';

export function assert(condition, message) {
  if (!condition) throw new Error(`${ERR_PREFIX} ${message}`);
}

export function assertInteger(value, name) {
  assert(Number.isInteger(value), `${name} must be an integer`);
}

export function assertNumber(value, name) {
  assert(typeof value === 'number' && !Number.isNaN(value), `${name} must be a number`);
}

export function toUTCDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day));
}

export function diffDaysUTC(a, b) {
  const ms = toUTCDate(a.year, a.month, a.day) - toUTCDate(b.year, b.month, b.day);
  return Math.round(ms / 86400000);
}

export function isValidBsYear(year) {
  return Object.prototype.hasOwnProperty.call(BS_CALENDAR_DATA, year);
}

export function getDaysInMonth(year, month) {
  if (!isValidBsYear(year)) return null;
  if (month < 1 || month > 12) return null;
  return BS_CALENDAR_DATA[year][month - 1];
}

export function getDaysInYear(year) {
  if (!isValidBsYear(year)) return null;
  return BS_CALENDAR_DATA[year].reduce((sum, d) => sum + d, 0);
}

export function isValidBsDate(year, month, day) {
  const dim = getDaysInMonth(year, month);
  return dim != null && day >= 1 && day <= dim;
}

export function compareBsDates(a, b) {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

export function clampDay(year, month, day) {
  const dim = getDaysInMonth(year, month);
  if (dim == null) return day;
  return Math.min(day, dim);
}

export function normalizeUnit(unit) {
  if (!unit) return 'day';
  const u = unit.toLowerCase();
  if (u === 'days') return 'day';
  if (u === 'weeks') return 'week';
  if (u === 'months') return 'month';
  if (u === 'years') return 'year';
  return u;
}

export function pad2(value) {
  return String(value).padStart(2, '0');
}

export function pad4(value) {
  return String(value).padStart(4, '0');
}

export function sameBsDate(a, b) {
  return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day;
}

export function isBetweenBs(date, start, end, inclusive = '[]') {
  const leftInclusive = inclusive[0] === '[';
  const rightInclusive = inclusive[1] === ']';
  const cmpStart = compareBsDates(date, start);
  const cmpEnd = compareBsDates(date, end);
  const afterStart = leftInclusive ? cmpStart >= 0 : cmpStart > 0;
  const beforeEnd = rightInclusive ? cmpEnd <= 0 : cmpEnd < 0;
  return afterStart && beforeEnd;
}
