# nepali-datepicker

Headless, framework-agnostic Nepali (BS) date picker with a rich manipulation API, range selection, and optional Material Design-inspired styles.

## Features

- Bikram Sambat (BS) support for 2000–2100 with AD conversion
- Immutable `NepaliDate` API inspired by Moment.js / Carbon
- Headless calendar engine and range engine
- Vanilla / React / Vue 3 / Svelte adapters
- Optional Material stylesheet and inline SVG icons

## Install

```bash
npm install nepali-datepicker
```

## Usage

### Vanilla

```js
import { createPicker, NepaliDate } from 'nepali-datepicker';
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

### Vue 3

```js
import { useNepaliDatePicker } from 'nepali-datepicker/vue';

const { state, selectDate } = useNepaliDatePicker({ locale: 'np' });
```

### Svelte

```js
import { createNepaliPickerStore } from 'nepali-datepicker/svelte';

const picker = createNepaliPickerStore({ locale: 'en' });
```

## API

### NepaliDate

- `new NepaliDate(year, month, day)`
- `NepaliDate.fromAD(date)`
- `NepaliDate.parse(str, formatStr, locale)`
- `NepaliDate.today()`
- `NepaliDate.fromTimestamp(ms)`

Getters: `year`, `month`, `day`, `weekDay`, `quarter`, `dayOfYear`, `weekOfYear`, `daysInMonth`, `daysInYear`, `isLeapYear`

Conversion: `toAD()`, `toObject()`, `toTimestamp()`, `format(formatStr, locale)`

Arithmetic: `add`, `subtract`, `startOf`, `endOf`, plus `addDays`, `addMonths`, `addYears`, `subtractDays`, `subtractMonths`, `subtractYears`

Comparison: `isBefore`, `isAfter`, `isSame`, `isBetween`, `isToday`, `isWeekend`, `isValid`, `diff`

Mutation: `clone`, `set(field, value)`

### CalendarEngine

Constructor options:

- `value`, `defaultDate`, `minDate`, `maxDate`
- `locale` (`'en' | 'np'`)
- `weekStartsOn` (`0 | 1`)
- `disabledDays`, `disabledDates`
- `onChange`, `onMonthChange`

Methods:

- `getState()`
- `goToPrevMonth`, `goToNextMonth`, `goToPrevYear`, `goToNextYear`
- `goToMonth(year, month)`, `goToToday()`, `setViewMode(mode)`
- `selectDate(nepaliDate)`, `clearSelection()`, `setValue(nepaliDate)`
- `subscribe(listener)`, `destroy()`

### RangePicker

Extends `CalendarEngine` with:

- `startDate`, `endDate`, `hoverDate`, `selectionPhase`
- `hoverDate(date)`, `setRange(start, end)`, `clearRange()`, `swapIfInverted()`

## Styling

Optional Material stylesheet:

```js
import 'nepali-datepicker/dist/material.css';
```

## Data Source

BS calendar data is derived from Government of Nepal calendar publications (via the `nepali-datetime` dataset). Supported range is 2000–2100 BS.

## Build

```bash
npm run build
npm test
```
