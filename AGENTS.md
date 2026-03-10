# Prompt: Build `nepali-datepicker` — A Headless Nepali (BS) Date Picker Library

---

## Overview

Build a **headless**, **framework-agnostic** JavaScript library called `nepali-datepicker` that provides:

1. A **core calendar engine** (pure logic, zero UI)
2. A **date range picker** built on top of the engine
3. A **rich date manipulation API** (inspired by Moment.js / Carbon)
4. Optional **material design-inspired default stylesheet** (opt-in CSS)
5. All UI renders using **inline SVG icons** — no icon font dependencies

The library must support **Bikram Sambat (BS) dates from 2000 BS to 2100 BS**, with full bidirectional conversion to/from Gregorian (AD).

---

## Project Structure

```
nepali-datepicker/
├── src/
│   ├── core/
│   │   ├── NepaliDate.js          # Date manipulation API
│   │   ├── calendar-data.js       # BS month-day lookup table (2000–2100)
│   │   ├── converter.js           # BS ↔ AD conversion engine
│   │   ├── locale.js              # en / np locale strings & formatters
│   │   └── utils.js               # Internal helpers
│   ├── picker/
│   │   ├── CalendarEngine.js      # Headless state machine (no DOM)
│   │   ├── RangePicker.js         # Range selection logic (extends CalendarEngine)
│   │   └── index.js               # Public picker API
│   ├── adapters/
│   │   ├── vanilla.js             # Vanilla JS adapter (renders to DOM)
│   │   ├── react.js               # React hook/component adapter
│   │   ├── vue.js                 # Vue 3 composable adapter
│   │   └── svelte.js              # Svelte store adapter
│   ├── styles/
│   │   └── material.css           # Optional material design stylesheet
│   └── index.js                   # Main entry point
├── dist/
│   ├── nepali-datepicker.esm.js
│   ├── nepali-datepicker.cjs.js
│   └── nepali-datepicker.umd.js
├── package.json
└── README.md
```

---

## 1. Calendar Data (`calendar-data.js`)

Store the number of days per month for every BS year from **2000 BS to 2100 BS** as a lookup table. Each year maps to an array of 12 integers (days in each month).

```js
// calendar-data.js
export const BS_CALENDAR_DATA = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  // ... continue for all years up to 2100
};

export const BS_START = { year: 2000, month: 1, day: 1 }; // 1 Baishakh 2000 BS
export const AD_EQUIVALENT_OF_BS_START = { year: 1943, month: 4, day: 14 }; // April 14, 1943 AD
```

> **Requirement**: The table must be complete and accurate. Use the verified BS calendar data published by the Government of Nepal.

---

## 2. BS ↔ AD Converter (`converter.js`)

```js
/**
 * Convert a Gregorian (AD) date to Bikram Sambat (BS).
 * @param {number} adYear
 * @param {number} adMonth  - 1-indexed
 * @param {number} adDay
 * @returns {{ year: number, month: number, day: number }}
 */
export function adToBS(adYear, adMonth, adDay) { ... }

/**
 * Convert a Bikram Sambat (BS) date to Gregorian (AD).
 * @param {number} bsYear
 * @param {number} bsMonth  - 1-indexed
 * @param {number} bsDay
 * @returns {{ year: number, month: number, day: number }}
 */
export function bsToAD(bsYear, bsMonth, bsDay) { ... }
```

**Algorithm**: Compute the total days elapsed from the known epoch anchor (`1 Baisakh 2000 BS = April 14, 1943 AD`) and walk the BS calendar data table to find the corresponding date.

---

## 3. Locale (`locale.js`)

Support two locales: `'en'` (English) and `'np'` (Nepali/Devanagari).

```js
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
    numberFormat: (n) => String(n),  // Arabic numerals
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
    numberFormat: (n) => String(n).replace(/\d/g, d => '०१२३४५६७८९'[d]),
  },
};

/**
 * Format a BS date into a human-readable string.
 * Tokens: YYYY, MM, DD, MMMM, MMM, dddd, ddd
 * @param {NepaliDate} date
 * @param {string} formatStr  e.g. 'YYYY-MM-DD' or 'MMMM DD, YYYY'
 * @param {'en'|'np'} locale
 */
export function formatDate(date, formatStr, locale = 'en') { ... }

/**
 * Parse a formatted BS date string back into a NepaliDate.
 * @param {string} str
 * @param {string} formatStr
 * @param {'en'|'np'} locale
 * @returns {NepaliDate}
 */
export function parseDate(str, formatStr, locale = 'en') { ... }
```

---

## 4. Date Manipulation API — `NepaliDate` class (`NepaliDate.js`)

This is the **core API object** — think Moment.js but for BS dates. All methods should be **chainable** where it makes sense, and the object should be **immutable by default** (methods return new instances unless noted).

```js
class NepaliDate {

  // ─── Construction ───────────────────────────────────────────────

  /**
   * Create from BS year/month/day.
   * Month is 1-indexed (1 = Baisakh).
   */
  constructor(bsYear, bsMonth, bsDay) { ... }

  /** Create from a JS Date (AD) object */
  static fromAD(jsDate) { ... }

  /** Create from a formatted string */
  static parse(str, formatStr = 'YYYY-MM-DD', locale = 'en') { ... }

  /** Return today's date in BS */
  static today() { ... }

  /** Return a NepaliDate from a Unix timestamp (ms) */
  static fromTimestamp(ms) { ... }


  // ─── Getters ────────────────────────────────────────────────────

  get year()   { ... }   // BS year
  get month()  { ... }   // BS month (1-indexed)
  get day()    { ... }   // BS day of month
  get weekDay(){ ... }   // 0 = Sunday, 6 = Saturday (Nepali week)
  get quarter(){ ... }   // 1–4
  get dayOfYear() { ... }
  get weekOfYear() { ... }
  get daysInMonth() { ... }
  get daysInYear()  { ... }
  get isLeapYear()  { ... } // True if the BS year has 366 days total


  // ─── Conversion ─────────────────────────────────────────────────

  /** Convert to JS Date (AD) */
  toAD() { ... }         // → Date

  /** Convert to plain object */
  toObject() { ... }     // → { year, month, day, weekDay }

  /** Convert to Unix timestamp (ms) */
  toTimestamp() { ... }

  /** Format to string */
  format(formatStr = 'YYYY-MM-DD', locale = 'en') { ... }


  // ─── Arithmetic ─────────────────────────────────────────────────

  add(value, unit) { ... }       // unit: 'day'|'week'|'month'|'year'
  subtract(value, unit) { ... }
  startOf(unit) { ... }          // unit: 'month'|'year'|'week'
  endOf(unit) { ... }

  // Shorthand helpers
  addDays(n)    { return this.add(n, 'day'); }
  addMonths(n)  { return this.add(n, 'month'); }
  addYears(n)   { return this.add(n, 'year'); }
  subtractDays(n)   { return this.subtract(n, 'day'); }
  subtractMonths(n) { return this.subtract(n, 'month'); }
  subtractYears(n)  { return this.subtract(n, 'year'); }


  // ─── Comparison ─────────────────────────────────────────────────

  isBefore(other) { ... }
  isAfter(other)  { ... }
  isSame(other, granularity = 'day') { ... }  // granularity: 'day'|'month'|'year'
  isBetween(start, end, inclusive = '[]') { ... } // inclusive: '[]','()','[)','(]'
  isToday()   { ... }
  isWeekend() { ... }
  isValid()   { ... }

  diff(other, unit = 'day') { ... }  // → number (signed)


  // ─── Cloning & Mutation ─────────────────────────────────────────

  clone()  { ... }
  set(field, value) { ... } // field: 'year'|'month'|'day' → returns new instance
}
```

**Export as both default and named:**
```js
export default NepaliDate;
export { NepaliDate };
```

---

## 5. Headless Calendar Engine (`CalendarEngine.js`)

The engine is a **pure state machine** — it holds all calendar state and emits state snapshots. It has **zero DOM/framework knowledge**.

```js
class CalendarEngine {

  /**
   * @param {object} options
   * @param {NepaliDate}  [options.value]        - Currently selected date
   * @param {NepaliDate}  [options.defaultDate]  - Date to show on first render
   * @param {NepaliDate}  [options.minDate]      - Earliest selectable date
   * @param {NepaliDate}  [options.maxDate]      - Latest selectable date
   * @param {'en'|'np'}  [options.locale='en']
   * @param {string[]}   [options.disabledDays]  - Weekday names to disable e.g. ['Sat']
   * @param {NepaliDate[]} [options.disabledDates] - Specific dates to disable
   * @param {Function}   [options.onChange]      - Called with (NepaliDate) on selection
   * @param {Function}   [options.onMonthChange] - Called with ({ year, month }) on nav
   */
  constructor(options = {}) { ... }

  // ─── State ───────────────────────────────────────────────────────

  /**
   * Returns a complete, serializable snapshot of current UI state.
   * Adapters call this to render.
   *
   * @returns {{
   *   viewYear:     number,
   *   viewMonth:    number,          // 1-indexed
   *   viewMode:     'day'|'month'|'year',
   *   weeks:        DayCell[][],     // 6 rows × 7 cols (null for padding)
   *   months:       MonthCell[],     // 12 items
   *   years:        YearCell[],      // ~12 items in current decade window
   *   selectedDate: NepaliDate|null,
   *   todayDate:    NepaliDate,
   *   locale:       'en'|'np',
   *   canGoBack:    boolean,
   *   canGoForward: boolean,
   * }}
   *
   * DayCell: { date: NepaliDate, label: string, isToday, isSelected,
   *            isDisabled, isOutsideMonth, weekDay }
   * MonthCell: { index: number, label: string, isSelected, isCurrent }
   * YearCell:  { year: number, isSelected, isCurrent }
   */
  getState() { ... }

  // ─── Navigation ──────────────────────────────────────────────────

  goToPrevMonth()  { ... }
  goToNextMonth()  { ... }
  goToPrevYear()   { ... }
  goToNextYear()   { ... }
  goToMonth(year, month) { ... }  // direct navigation
  goToToday()      { ... }

  setViewMode(mode) { ... }  // 'day' | 'month' | 'year'

  // ─── Selection ───────────────────────────────────────────────────

  selectDate(nepaliDate) { ... }
  clearSelection()       { ... }
  setValue(nepaliDate)   { ... }  // programmatic set (no onChange fired)

  // ─── Subscriptions ───────────────────────────────────────────────

  /**
   * Subscribe to any state change.
   * @param {Function} listener - called with (state) after each change
   * @returns {Function} unsubscribe
   */
  subscribe(listener) { ... }

  destroy() { ... }  // clean up all subscriptions
}
```

---

## 6. Range Picker Engine (`RangePicker.js`)

Extends `CalendarEngine`. Adds range-selection state.

```js
class RangePicker extends CalendarEngine {

  /**
   * Additional options:
   * @param {object} options
   * @param {NepaliDate} [options.startDate]     - Initial range start
   * @param {NepaliDate} [options.endDate]       - Initial range end
   * @param {number}     [options.minRange]      - Min days between start/end
   * @param {number}     [options.maxRange]      - Max days between start/end
   * @param {Function}   [options.onRangeChange] - Called with ({ start, end })
   */
  constructor(options = {}) { ... }

  // ─── Overrides getState() to include: ────────────────────────────
  //   startDate:       NepaliDate | null
  //   endDate:         NepaliDate | null
  //   hoverDate:       NepaliDate | null
  //   selectionPhase:  'idle' | 'start-selected' | 'complete'
  //
  // Each DayCell also gets:
  //   isRangeStart, isRangeEnd, isInRange, isRangeHover

  // ─── Range-specific methods ───────────────────────────────────────

  hoverDate(nepaliDate)   { ... }  // called on mouseover during selection
  selectDate(nepaliDate)  { ... }  // overrides: first click = start, second = end
  setRange(start, end)    { ... }  // programmatic
  clearRange()            { ... }
  swapIfInverted()        { ... }  // ensures start < end
}
```

---

## 7. Vanilla JS Adapter (`adapters/vanilla.js`)

This adapter **renders HTML from engine state** and **wires DOM events back** to the engine.

```js
/**
 * Mounts a date picker into a DOM container.
 *
 * @param {HTMLElement} container
 * @param {object} options          - Merged with CalendarEngine options
 * @param {boolean} [options.range=false]  - Use RangePicker instead
 * @param {string}  [options.inputSelector] - If set, sync value to this <input>
 * @param {string}  [options.format='YYYY-MM-DD']
 * @returns {{
 *   engine: CalendarEngine | RangePicker,
 *   destroy: Function,
 *   open: Function,
 *   close: Function,
 *   getValue: Function,     // → NepaliDate | { start, end }
 *   setValue: Function,
 * }}
 */
export function createPicker(container, options = {}) { ... }
```

The renderer should build the UI by calling `engine.getState()` after every state change and doing a **full re-render** of the calendar panel (no virtual DOM — just `innerHTML` for simplicity, with event delegation).

---

## 8. React Adapter (`adapters/react.js`)

Export a hook and a render-prop component.

```jsx
/**
 * Headless hook — returns state + action handlers.
 * The consumer renders whatever UI they want.
 */
export function useNepaliDatePicker(options = {}) {
  // Returns:
  return {
    state,            // CalendarEngine.getState() snapshot
    engine,           // Direct engine reference for advanced use
    // Convenience bound actions:
    goToPrevMonth, goToNextMonth,
    goToPrevYear, goToNextYear,
    goToToday, setViewMode,
    selectDate, clearSelection,
    // For range mode:
    hoverDate, setRange, clearRange,
  };
}

/**
 * Headless render-prop component.
 */
export function NepaliDatePicker({ options, children }) {
  const picker = useNepaliDatePicker(options);
  return children(picker);
}
```

---

## 9. Vue 3 Adapter (`adapters/vue.js`)

```js
/**
 * Vue 3 composable.
 */
export function useNepaliDatePicker(options = {}) {
  const state = ref(null);
  // ... wraps CalendarEngine, updates reactive state on subscribe()
  return { state, engine, goToPrevMonth, goToNextMonth, ... };
}
```

---

## 10. Svelte Adapter (`adapters/svelte.js`)

```js
/**
 * Returns a Svelte-compatible readable store.
 */
export function createNepaliPickerStore(options = {}) {
  // Wraps engine.subscribe() into a Svelte readable store
  return { subscribe, engine, goToPrevMonth, ... };
}
```

---

## 11. SVG Icons

Define all icons as **inline SVG strings** or components. Do **not** use any icon font library.

Required icons (24×24 viewBox, strokeWidth=2, no fill):

| Icon | Usage |
|---|---|
| `chevron-left` | Go to previous month |
| `chevron-right` | Go to next month |
| `chevrons-left` | Go to previous year |
| `chevrons-right` | Go to next year |
| `chevron-up` | Expand year/month selector |
| `chevron-down` | Collapse selector |
| `calendar` | Calendar trigger icon |
| `x-circle` | Clear selection |
| `check` | Confirm selection (mobile) |
| `today-dot` | Indicator for today's cell |

```js
// icons.js
export const ICONS = {
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ...>...</svg>`,
  // ...
};
```

---

## 12. Material Design Stylesheet (`styles/material.css`)

An **optional** stylesheet. Users import it manually: `import 'nepali-datepicker/dist/material.css'`.

### Design Tokens (CSS custom properties):

```css
:root {
  --ndp-primary:           #1976D2;
  --ndp-primary-dark:      #115293;
  --ndp-primary-light:     #E3F2FD;
  --ndp-surface:           #FFFFFF;
  --ndp-on-surface:        #212121;
  --ndp-on-surface-muted:  #757575;
  --ndp-ripple:            rgba(25, 118, 210, 0.12);
  --ndp-shadow-1:          0 2px 4px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08);
  --ndp-shadow-2:          0 6px 20px rgba(0,0,0,.15);
  --ndp-radius-sm:         4px;
  --ndp-radius-md:         8px;
  --ndp-radius-full:       9999px;
  --ndp-font:              'Roboto', sans-serif;
  --ndp-font-np:           'Noto Sans Devanagari', sans-serif;
  --ndp-transition:        150ms cubic-bezier(0.4, 0, 0.2, 1);
  --ndp-cell-size:         36px;
  --ndp-width:             280px;
}
```

### Component classes to style:

```
.ndp-container          - Outer wrapper (position: relative)
.ndp-panel              - Floating calendar panel (box-shadow, border-radius)
.ndp-header             - Month/year nav row
.ndp-header__nav-btn    - Icon navigation buttons (ripple effect)
.ndp-header__title      - Clickable month/year label
.ndp-grid               - 7-col CSS Grid for day cells
.ndp-weekday            - Day-of-week header cells
.ndp-cell               - Individual day cell
.ndp-cell--today        - Today's date (outline circle)
.ndp-cell--selected     - Selected date (filled primary circle)
.ndp-cell--disabled     - Grayed out, pointer-events none
.ndp-cell--outside      - Days outside current month (muted)
.ndp-cell--range-start  - Range start (filled, left-rounded)
.ndp-cell--range-end    - Range end (filled, right-rounded)
.ndp-cell--in-range     - Days within range (light primary bg)
.ndp-cell--hover        - Hover preview in range mode
.ndp-month-grid         - 3-col grid for month selector view
.ndp-year-grid          - 3-col grid for year selector view
.ndp-footer             - Bottom bar with Today / Clear buttons
.ndp-footer__btn        - Text buttons (material style)
.ndp-input-wrapper      - Wrapper when attached to an input
.ndp-input              - Styled text input trigger
```

### Animations:
- Panel open/close: `transform: scale(0.95) → 1` + `opacity 0 → 1`, `transform-origin: top left`
- Cell hover: ripple using `::after` pseudo-element
- Month/year transition: slide left/right using `@keyframes ndp-slide-in-*`

---

## 13. Public Entry Point (`index.js`)

```js
// Core
export { NepaliDate } from './core/NepaliDate.js';
export { adToBS, bsToAD } from './core/converter.js';
export { formatDate, parseDate, LOCALES } from './core/locale.js';
export { BS_CALENDAR_DATA } from './core/calendar-data.js';

// Engines
export { CalendarEngine } from './picker/CalendarEngine.js';
export { RangePicker } from './picker/RangePicker.js';

// Vanilla adapter (tree-shakeable)
export { createPicker } from './adapters/vanilla.js';

// React, Vue, Svelte adapters are separate entry points:
// import { useNepaliDatePicker } from 'nepali-datepicker/react'
// import { useNepaliDatePicker } from 'nepali-datepicker/vue'
// import { createNepaliPickerStore } from 'nepali-datepicker/svelte'
```

---

## 14. `package.json` Spec

```json
{
  "name": "nepali-datepicker",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/nepali-datepicker.cjs.js",
  "module": "./dist/nepali-datepicker.esm.js",
  "exports": {
    ".": {
      "import": "./dist/nepali-datepicker.esm.js",
      "require": "./dist/nepali-datepicker.cjs.js"
    },
    "./react":  { "import": "./dist/adapters/react.esm.js" },
    "./vue":    { "import": "./dist/adapters/vue.esm.js" },
    "./svelte": { "import": "./dist/adapters/svelte.esm.js" },
    "./dist/material.css": "./dist/material.css"
  },
  "sideEffects": ["./dist/material.css"],
  "files": ["dist"],
  "keywords": ["nepali", "bikram-sambat", "BS", "datepicker", "headless", "calendar", "nepal"],
  "devDependencies": {
    "rollup": "^4",
    "vitest": "^1"
  }
}
```

---

## 15. Usage Examples (for documentation / tests)

### Vanilla JS

```js
import { createPicker } from 'nepali-datepicker';
import 'nepali-datepicker/dist/material.css';

const picker = createPicker(document.getElementById('my-picker'), {
  locale: 'np',
  defaultDate: NepaliDate.today(),
  minDate: NepaliDate.parse('2080-01-01'),
  maxDate: NepaliDate.parse('2085-12-30'),
  onChange: (date) => console.log(date.format('YYYY MMMM DD', 'np')),
});
```

### Range Picker

```js
const rangePicker = createPicker(container, {
  range: true,
  locale: 'en',
  minRange: 2,
  maxRange: 30,
  onRangeChange: ({ start, end }) => {
    console.log(`${start.format()} → ${end.format()}`);
    console.log(`Duration: ${start.diff(end, 'day')} days`);
  },
});
```

### NepaliDate API

```js
import { NepaliDate } from 'nepali-datepicker';

const date = NepaliDate.today();

date.format('YYYY-MM-DD');                  // '2081-06-15'
date.format('MMMM DD, YYYY', 'np');        // 'आश्विन १५, २०८१'

date.addMonths(3).startOf('month').format(); // first day 3 months later
date.subtract(10, 'day').isWeekend();
date.diff(NepaliDate.parse('2081-01-01'), 'day'); // days since Baisakh 1

const ad = date.toAD();                    // → JS Date
NepaliDate.fromAD(new Date());             // → NepaliDate

date.isBetween(
  NepaliDate.parse('2081-01-01'),
  NepaliDate.parse('2081-12-30'),
  '[]'
); // true
```

### React

```jsx
import { useNepaliDatePicker } from 'nepali-datepicker/react';

function MyPicker() {
  const { state, selectDate, goToPrevMonth, goToNextMonth } =
    useNepaliDatePicker({ locale: 'en' });

  return (
    <div className="my-calendar">
      <button onClick={goToPrevMonth}>‹</button>
      <span>{state.viewYear} / {state.viewMonth}</span>
      <button onClick={goToNextMonth}>›</button>
      <div className="grid">
        {state.weeks.flat().map((cell, i) =>
          cell ? (
            <button
              key={i}
              onClick={() => selectDate(cell.date)}
              className={cell.isSelected ? 'selected' : ''}
              disabled={cell.isDisabled}
            >
              {cell.label}
            </button>
          ) : <span key={i} />
        )}
      </div>
    </div>
  );
}
```

---

## 16. Implementation Rules & Constraints

1. **Zero runtime dependencies** — no moment, dayjs, lodash, or any third-party library in `src/`
2. **ES2020+ syntax** — use optional chaining, nullish coalescing, class fields; do NOT use TypeScript (ship `.d.ts` declaration files separately if needed)
3. **Immutability** — `NepaliDate` instances are frozen; all arithmetic returns new instances
4. **Tree-shakeable** — all exports are named; adapters are separate entry points
5. **Thorough error handling** — throw descriptive `Error` with `[NepaliDate]` prefix for invalid inputs (out-of-range years, invalid month/day)
6. **Week starts Sunday** — default. Expose a `weekStartsOn` option (0=Sun, 1=Mon) in the engine
7. **Accessibility** — the vanilla adapter renders `aria-label`, `role="grid"`, `aria-selected`, `aria-disabled` on all cells
8. **No DOM globals in core** — `NepaliDate.js`, `converter.js`, `CalendarEngine.js` must be runnable in Node.js (for SSR)
9. **Full test coverage** — write Vitest unit tests for: converter round-trips, NepaliDate arithmetic edge cases (month-end overflow, year boundary), range logic, locale formatting
10. **Bundle targets** — ESM, CJS, and UMD (iife) via Rollup; CSS is a separate file, never injected automatically

---

## 17. Deliverables Checklist

- [ ] `src/core/calendar-data.js` with complete 2000–2100 BS data
- [ ] `src/core/converter.js` with verified BS↔AD algorithm
- [ ] `src/core/locale.js` with `en` and `np` locale + format/parse
- [ ] `src/core/NepaliDate.js` with full API
- [ ] `src/picker/CalendarEngine.js` with state machine + `getState()`
- [ ] `src/picker/RangePicker.js` extending CalendarEngine
- [ ] `src/adapters/vanilla.js` with full DOM renderer
- [ ] `src/adapters/react.js` with hook + render-prop
- [ ] `src/adapters/vue.js` with Vue 3 composable
- [ ] `src/adapters/svelte.js` with Svelte store
- [ ] `src/styles/material.css` with all tokens + components
- [ ] `src/icons.js` with all SVG icons as strings
- [ ] `src/index.js` main entry
- [ ] `rollup.config.js` building all targets
- [ ] Vitest test suite with ≥80% coverage
- [ ] `README.md` with full API reference and examples

---

*End of prompt.*
