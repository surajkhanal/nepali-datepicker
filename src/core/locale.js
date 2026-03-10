import NepaliDate from './NepaliDate.js';
import { pad2, pad4 } from './utils.js';

export const LOCALES = {
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

export function formatDate(date, formatStr, locale = 'en') {
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

export function parseDate(str, formatStr, locale = 'en') {
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
