import { BS_CALENDAR_DATA, BS_START, AD_EQUIVALENT_OF_BS_START } from './calendar-data.js';
import {
  assert,
  assertInteger,
  diffDaysUTC,
  isValidBsDate,
  isValidBsYear,
  toUTCDate,
} from './utils.js';

const BS_YEARS = Object.keys(BS_CALENDAR_DATA).map(Number).sort((a, b) => a - b);
const BS_MIN_YEAR = BS_YEARS[0];
const BS_MAX_YEAR = BS_YEARS[BS_YEARS.length - 1];
const BS_MAX_MONTH = 12;
const BS_MAX_DAY = BS_CALENDAR_DATA[BS_MAX_YEAR][BS_MAX_MONTH - 1];

const TOTAL_BS_DAYS = BS_YEARS.reduce((sum, year) => {
  return sum + BS_CALENDAR_DATA[year].reduce((acc, d) => acc + d, 0);
}, 0);

const MAX_OFFSET = TOTAL_BS_DAYS - 1;

function validateAdDate(adYear, adMonth, adDay) {
  assertInteger(adYear, 'adYear');
  assertInteger(adMonth, 'adMonth');
  assertInteger(adDay, 'adDay');
  const date = toUTCDate(adYear, adMonth, adDay);
  assert(
    date.getUTCFullYear() === adYear &&
      date.getUTCMonth() + 1 === adMonth &&
      date.getUTCDate() === adDay,
    'Invalid AD date'
  );
}

function validateBsDate(bsYear, bsMonth, bsDay) {
  assertInteger(bsYear, 'bsYear');
  assertInteger(bsMonth, 'bsMonth');
  assertInteger(bsDay, 'bsDay');
  assert(isValidBsYear(bsYear), `BS year out of range (${BS_MIN_YEAR}-${BS_MAX_YEAR})`);
  assert(isValidBsDate(bsYear, bsMonth, bsDay), 'Invalid BS date');
}

function bsOffsetFromStart(bsYear, bsMonth, bsDay) {
  let days = 0;
  for (let y = BS_START.year; y < bsYear; y += 1) {
    const months = BS_CALENDAR_DATA[y];
    for (let i = 0; i < 12; i += 1) days += months[i];
  }
  const months = BS_CALENDAR_DATA[bsYear];
  for (let m = 1; m < bsMonth; m += 1) days += months[m - 1];
  days += bsDay - 1;
  return days;
}

function bsFromOffset(offsetDays) {
  let year = BS_START.year;
  let month = BS_START.month;
  let day = BS_START.day;
  let days = offsetDays;
  while (days > 0) {
    const dim = BS_CALENDAR_DATA[year][month - 1];
    if (day + days <= dim) {
      day += days;
      days = 0;
      break;
    }
    const remaining = dim - day + 1;
    days -= remaining;
    day = 1;
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return { year, month, day };
}

function adFromOffset(offsetDays) {
  const start = toUTCDate(
    AD_EQUIVALENT_OF_BS_START.year,
    AD_EQUIVALENT_OF_BS_START.month,
    AD_EQUIVALENT_OF_BS_START.day
  );
  const date = new Date(start.getTime() + offsetDays * 86400000);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/**
 * Convert a Gregorian (AD) date to Bikram Sambat (BS).
 */
export function adToBS(adYear, adMonth, adDay) {
  validateAdDate(adYear, adMonth, adDay);
  const offset = diffDaysUTC(
    { year: adYear, month: adMonth, day: adDay },
    AD_EQUIVALENT_OF_BS_START
  );
  assert(offset >= 0 && offset <= MAX_OFFSET, 'AD date out of supported BS range');
  return bsFromOffset(offset);
}

/**
 * Convert a Bikram Sambat (BS) date to Gregorian (AD).
 */
export function bsToAD(bsYear, bsMonth, bsDay) {
  validateBsDate(bsYear, bsMonth, bsDay);
  const offset = bsOffsetFromStart(bsYear, bsMonth, bsDay);
  assert(offset >= 0 && offset <= MAX_OFFSET, 'BS date out of supported range');
  return adFromOffset(offset);
}

export const BS_RANGE = {
  start: { ...BS_START },
  end: { year: BS_MAX_YEAR, month: BS_MAX_MONTH, day: BS_MAX_DAY },
};
