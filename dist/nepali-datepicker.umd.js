(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.NepaliDatePicker = {}));
})(this, (function (exports) { 'use strict';

  // Auto-generated from nepali_datetime calendar_bs.csv
  const BS_CALENDAR_DATA = {
    2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2062: [31, 31, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2087: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
    2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2091: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
    2092: [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2093: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2094: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2095: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
    2096: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2097: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2098: [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31],
    2099: [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
    2100: [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30],
  };

  const BS_START = { year: 2000, month: 1, day: 1 };
  const AD_EQUIVALENT_OF_BS_START = { year: 1943, month: 4, day: 14 };

  const ERR_PREFIX = '[NepaliDate]';

  function assert(condition, message) {
    if (!condition) throw new Error(`${ERR_PREFIX} ${message}`);
  }

  function assertInteger(value, name) {
    assert(Number.isInteger(value), `${name} must be an integer`);
  }

  function assertNumber(value, name) {
    assert(typeof value === 'number' && !Number.isNaN(value), `${name} must be a number`);
  }

  function toUTCDate(year, month, day) {
    return new Date(Date.UTC(year, month - 1, day));
  }

  function diffDaysUTC(a, b) {
    const ms = toUTCDate(a.year, a.month, a.day) - toUTCDate(b.year, b.month, b.day);
    return Math.round(ms / 86400000);
  }

  function isValidBsYear(year) {
    return Object.prototype.hasOwnProperty.call(BS_CALENDAR_DATA, year);
  }

  function getDaysInMonth(year, month) {
    if (!isValidBsYear(year)) return null;
    if (month < 1 || month > 12) return null;
    return BS_CALENDAR_DATA[year][month - 1];
  }

  function getDaysInYear(year) {
    if (!isValidBsYear(year)) return null;
    return BS_CALENDAR_DATA[year].reduce((sum, d) => sum + d, 0);
  }

  function isValidBsDate(year, month, day) {
    const dim = getDaysInMonth(year, month);
    return dim != null && day >= 1 && day <= dim;
  }

  function compareBsDates(a, b) {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  }

  function clampDay(year, month, day) {
    const dim = getDaysInMonth(year, month);
    if (dim == null) return day;
    return Math.min(day, dim);
  }

  function normalizeUnit(unit) {
    if (!unit) return 'day';
    const u = unit.toLowerCase();
    if (u === 'days') return 'day';
    if (u === 'weeks') return 'week';
    if (u === 'months') return 'month';
    if (u === 'years') return 'year';
    return u;
  }

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function pad4(value) {
    return String(value).padStart(4, '0');
  }

  function sameBsDate(a, b) {
    return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day;
  }

  function isBetweenBs(date, start, end, inclusive = '[]') {
    const leftInclusive = inclusive[0] === '[';
    const rightInclusive = inclusive[1] === ']';
    const cmpStart = compareBsDates(date, start);
    const cmpEnd = compareBsDates(date, end);
    const afterStart = leftInclusive ? cmpStart >= 0 : cmpStart > 0;
    const beforeEnd = rightInclusive ? cmpEnd <= 0 : cmpEnd < 0;
    return afterStart && beforeEnd;
  }

  const BS_YEARS$1 = Object.keys(BS_CALENDAR_DATA).map(Number).sort((a, b) => a - b);
  const BS_MIN_YEAR$1 = BS_YEARS$1[0];
  const BS_MAX_YEAR$1 = BS_YEARS$1[BS_YEARS$1.length - 1];
  const BS_MAX_MONTH = 12;
  BS_CALENDAR_DATA[BS_MAX_YEAR$1][BS_MAX_MONTH - 1];

  const TOTAL_BS_DAYS = BS_YEARS$1.reduce((sum, year) => {
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
    assert(isValidBsYear(bsYear), `BS year out of range (${BS_MIN_YEAR$1}-${BS_MAX_YEAR$1})`);
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
  function adToBS(adYear, adMonth, adDay) {
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
  function bsToAD(bsYear, bsMonth, bsDay) {
    validateBsDate(bsYear, bsMonth, bsDay);
    const offset = bsOffsetFromStart(bsYear, bsMonth, bsDay);
    assert(offset >= 0 && offset <= MAX_OFFSET, 'BS date out of supported range');
    return adFromOffset(offset);
  }

  const LOCALES = {
    en: {
      months: [
        'Baisakh', 'Jestha', 'Ashadh', 'Shrawan',
        'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
        'Poush', 'Magh', 'Falgun', 'Chaitra'
      ],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      today: 'Today',
      clear: 'Clear',
      numberFormat: (n) => String(n),
    },
    np: {
      months: [
        'बैशाख', 'जेठ', 'असार', 'श्रावण',
        'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर',
        'पुष', 'माघ', 'फाल्गुण', 'चैत्र'
      ],
      days: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि'],
      daysLong: ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'],
      today: 'आज',
      clear: 'मेटाउनुहोस्',
      numberFormat: (n) => String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[d]),
    },
  };

  const TOKEN_REGEX = /(YYYY|MMMM|MMM|MM|DD|dddd|ddd)/g;

  function getLocale(locale) {
    return LOCALES[locale] || LOCALES.en;
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalizeNumerals(input) {
    return input.replace(/[०-९]/g, (d) => '०१२३४५६७८९'.indexOf(d));
  }

  function formatDate(date, formatStr, locale = 'en') {
    const loc = getLocale(locale);
    const months = loc.months;
    const monthsShort = months.map((m) => (m.length > 3 ? m.slice(0, 3) : m));
    const days = loc.days;
    const daysLong = loc.daysLong;
    const replacements = {
      YYYY: loc.numberFormat(pad4(date.year)),
      MM: loc.numberFormat(pad2(date.month)),
      DD: loc.numberFormat(pad2(date.day)),
      MMMM: months[date.month - 1],
      MMM: monthsShort[date.month - 1],
      ddd: days[date.weekDay],
      dddd: daysLong[date.weekDay],
    };
    return formatStr.replace(TOKEN_REGEX, (token) => replacements[token] ?? token);
  }

  function parseDate(str, formatStr, locale = 'en') {
    const loc = getLocale(locale);
    const months = loc.months;
    const monthsShort = months.map((m) => (m.length > 3 ? m.slice(0, 3) : m));
    const dayNames = [...loc.days, ...loc.daysLong];
    const tokens = [];
    const regexStr = formatStr.replace(TOKEN_REGEX, (token) => {
      tokens.push(token);
      if (token === 'YYYY') return '(\\d{4})';
      if (token === 'MM') return '(\\d{1,2})';
      if (token === 'DD') return '(\\d{1,2})';
      if (token === 'MMMM') return `(${months.map(escapeRegex).join('|')})`;
      if (token === 'MMM') return `(${monthsShort.map(escapeRegex).join('|')})`;
      if (token === 'ddd' || token === 'dddd') return `(${dayNames.map(escapeRegex).join('|')})`;
      return token;
    });

    const normalized = normalizeNumerals(str);
    const match = new RegExp(`^${regexStr}$`).exec(normalized);
    if (!match) throw new Error('[NepaliDate] Invalid date format');

    let year = null;
    let month = null;
    let day = null;

    tokens.forEach((token, idx) => {
      const value = match[idx + 1];
      if (token === 'YYYY') year = Number(value);
      if (token === 'MM') month = Number(value);
      if (token === 'DD') day = Number(value);
      if (token === 'MMMM') month = months.indexOf(value) + 1;
      if (token === 'MMM') month = monthsShort.indexOf(value) + 1;
    });

    if (!year || !month || !day) throw new Error('[NepaliDate] Invalid date format');
    return new NepaliDate(year, month, day);
  }

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

  class CalendarEngine {
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

  class RangePicker extends CalendarEngine {
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

  const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  const SVG_CLOSE = '</svg>';

  const ICONS = {
    chevronLeft: `${SVG_OPEN}<polyline points="15 18 9 12 15 6" />${SVG_CLOSE}`,
    chevronRight: `${SVG_OPEN}<polyline points="9 18 15 12 9 6" />${SVG_CLOSE}`,
    chevronsLeft: `${SVG_OPEN}<polyline points="18 18 12 12 18 6" /><polyline points="12 18 6 12 12 6" />${SVG_CLOSE}`,
    chevronsRight: `${SVG_OPEN}<polyline points="6 18 12 12 6 6" /><polyline points="12 18 18 12 12 6" />${SVG_CLOSE}`,
    chevronUp: `${SVG_OPEN}<polyline points="18 15 12 9 6 15" />${SVG_CLOSE}`,
    chevronDown: `${SVG_OPEN}<polyline points="6 9 12 15 18 9" />${SVG_CLOSE}`};

  function rotateWeekdays(days, start) {
    const idx = ((start % 7) + 7) % 7;
    return [...days.slice(idx), ...days.slice(0, idx)];
  }

  function formatAriaLabel(date, locale) {
    return date.format('YYYY-MM-DD', locale);
  }

  function renderHeader(state, icons) {
    const { viewYear, viewMonth, viewMode, locale, canGoBack, canGoForward } = state;
    const loc = LOCALES[locale];
    const title = `${loc.months[viewMonth - 1]} ${loc.numberFormat(viewYear)}`;
    const toggleIcon = viewMode === 'day' ? icons.chevronDown : icons.chevronUp;

    return `
    <div class="ndp-header">
      <button class="ndp-header__nav-btn" data-action="prev-year" aria-label="Previous year" ${canGoBack ? '' : 'disabled'}>${icons.chevronsLeft}</button>
      <button class="ndp-header__nav-btn" data-action="prev-month" aria-label="Previous month" ${canGoBack ? '' : 'disabled'}>${icons.chevronLeft}</button>
      <button class="ndp-header__title" data-action="toggle-view" aria-label="Change view">
        <span>${title}</span>${toggleIcon}
      </button>
      <button class="ndp-header__nav-btn" data-action="next-month" aria-label="Next month" ${canGoForward ? '' : 'disabled'}>${icons.chevronRight}</button>
      <button class="ndp-header__nav-btn" data-action="next-year" aria-label="Next year" ${canGoForward ? '' : 'disabled'}>${icons.chevronsRight}</button>
    </div>
  `;
  }

  function renderDayGrid(state, weekStartsOn) {
    const loc = LOCALES[state.locale];
    const weekdays = rotateWeekdays(loc.days, weekStartsOn);
    const header = weekdays
      .map((d) => `<div class="ndp-weekday">${d}</div>`)
      .join('');

    const cells = state.weeks
      .flat()
      .map((cell) => {
        if (!cell) return '<span></span>';
        const classes = [
          'ndp-cell',
          cell.isToday ? 'ndp-cell--today' : '',
          cell.isSelected ? 'ndp-cell--selected' : '',
          cell.isDisabled ? 'ndp-cell--disabled' : '',
          cell.isOutsideMonth ? 'ndp-cell--outside' : '',
          cell.isRangeStart ? 'ndp-cell--range-start' : '',
          cell.isRangeEnd ? 'ndp-cell--range-end' : '',
          cell.isInRange ? 'ndp-cell--in-range' : '',
          cell.isRangeHover ? 'ndp-cell--hover' : '',
        ]
          .filter(Boolean)
          .join(' ');
        const aria = formatAriaLabel(cell.date, state.locale);
        return `
        <button
          type="button"
          class="${classes}"
          data-action="select-date"
          data-y="${cell.date.year}"
          data-m="${cell.date.month}"
          data-d="${cell.date.day}"
          role="gridcell"
          aria-selected="${cell.isSelected ? 'true' : 'false'}"
          aria-disabled="${cell.isDisabled ? 'true' : 'false'}"
          aria-label="${aria}"
          ${cell.isDisabled ? 'disabled' : ''}
        >${cell.label}</button>
      `;
      })
      .join('');

    return `
    <div class="ndp-grid" role="grid">${header}${cells}</div>
  `;
  }

  function renderMonthGrid(state) {
    return `
    <div class="ndp-month-grid">
      ${state.months
        .map((m) => {
          const classes = ['ndp-cell', m.isCurrent ? 'ndp-cell--selected' : '']
            .filter(Boolean)
            .join(' ');
          return `<button type="button" class="${classes}" data-action="select-month" data-month="${m.index}">${m.label}</button>`;
        })
        .join('')}
    </div>
  `;
  }

  function renderYearGrid(state) {
    return `
    <div class="ndp-year-grid">
      ${state.years
        .map((y) => {
          const classes = ['ndp-cell', y.isCurrent ? 'ndp-cell--selected' : '']
            .filter(Boolean)
            .join(' ');
          return `<button type="button" class="${classes}" data-action="select-year" data-year="${y.year}">${y.year}</button>`;
        })
        .join('')}
    </div>
  `;
  }

  function renderFooter(state) {
    const loc = LOCALES[state.locale];
    return `
    <div class="ndp-footer">
      <button class="ndp-footer__btn" data-action="today">${loc.today}</button>
      <button class="ndp-footer__btn" data-action="clear">${loc.clear}</button>
    </div>
  `;
  }

  function createPicker(container, options = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('[NepaliDate] Container element is required');
    }

    const { range = false, inputSelector, format = 'YYYY-MM-DD', ...engineOptions } = options;
    const EngineClass = range ? RangePicker : CalendarEngine;
    const engine = new EngineClass(engineOptions);
    const weekStartsOn = Number.isInteger(options.weekStartsOn) ? options.weekStartsOn : 0;
    const panel = document.createElement('div');
    panel.className = 'ndp-panel';

    container.classList.add('ndp-container');
    container.appendChild(panel);

    let inputEl = null;
    if (inputSelector) {
      inputEl = document.querySelector(inputSelector);
      if (inputEl) {
        inputEl.classList.add('ndp-input');
        inputEl.addEventListener('click', () => open());
      }
    }

    const render = (state) => {
      const header = renderHeader(state, ICONS);
      const body =
        state.viewMode === 'day'
          ? renderDayGrid(state, weekStartsOn)
          : state.viewMode === 'month'
          ? renderMonthGrid(state)
          : renderYearGrid(state);
      const footer = renderFooter(state);
      panel.innerHTML = `${header}${body}${footer}`;

      if (inputEl) {
        if (range) {
          const start = state.startDate;
          const end = state.endDate;
          inputEl.value = start && end ? `${start.format(format, state.locale)} - ${end.format(format, state.locale)}` : '';
        } else {
          inputEl.value = state.selectedDate ? state.selectedDate.format(format, state.locale) : '';
        }
      }
    };

    const unsubscribe = engine.subscribe(render);

    const onClick = (event) => {
      const target = event.target.closest('[data-action]');
      if (!target) return;
      const action = target.getAttribute('data-action');
      if (!action) return;

      if (action === 'prev-month') engine.goToPrevMonth();
      if (action === 'next-month') engine.goToNextMonth();
      if (action === 'prev-year') engine.goToPrevYear();
      if (action === 'next-year') engine.goToNextYear();
      if (action === 'today') engine.goToToday();
      if (action === 'clear') {
        if (range) engine.clearRange();
        else engine.clearSelection();
      }
      if (action === 'toggle-view') {
        const next = engine.viewMode === 'day' ? 'month' : engine.viewMode === 'month' ? 'year' : 'day';
        engine.setViewMode(next);
      }
      if (action === 'select-date') {
        const y = Number(target.getAttribute('data-y'));
        const m = Number(target.getAttribute('data-m'));
        const d = Number(target.getAttribute('data-d'));
        const date = new NepaliDate(y, m, d);
        engine.selectDate(date);
      }
      if (action === 'select-month') {
        const month = Number(target.getAttribute('data-month'));
        engine.goToMonth(engine.viewYear, month);
        engine.setViewMode('day');
      }
      if (action === 'select-year') {
        const year = Number(target.getAttribute('data-year'));
        engine.goToMonth(year, engine.viewMonth);
        engine.setViewMode('month');
      }
    };

    const onHover = (event) => {
      if (!range) return;
      const target = event.target.closest('[data-action="select-date"]');
      if (!target) return;
      const y = Number(target.getAttribute('data-y'));
      const m = Number(target.getAttribute('data-m'));
      const d = Number(target.getAttribute('data-d'));
      const date = new NepaliDate(y, m, d);
      engine.hoverDate(date);
    };

    container.addEventListener('click', onClick);
    container.addEventListener('mouseover', onHover);

    const open = () => {
      panel.style.display = 'block';
    };

    const close = () => {
      panel.style.display = 'none';
    };

    return {
      engine,
      destroy() {
        unsubscribe();
        engine.destroy();
        container.removeEventListener('click', onClick);
        container.removeEventListener('mouseover', onHover);
        if (panel.parentNode) panel.parentNode.removeChild(panel);
      },
      open,
      close,
      getValue() {
        if (range) return { start: engine.startDate, end: engine.endDate };
        return engine.selectedDate;
      },
      setValue(value) {
        if (range) {
          engine.setRange(value?.start || null, value?.end || null);
        } else {
          engine.setValue(value);
        }
      },
    };
  }

  exports.BS_CALENDAR_DATA = BS_CALENDAR_DATA;
  exports.CalendarEngine = CalendarEngine;
  exports.LOCALES = LOCALES;
  exports.NepaliDate = NepaliDate;
  exports.RangePicker = RangePicker;
  exports.adToBS = adToBS;
  exports.bsToAD = bsToAD;
  exports.createPicker = createPicker;
  exports.formatDate = formatDate;
  exports.parseDate = parseDate;

}));
