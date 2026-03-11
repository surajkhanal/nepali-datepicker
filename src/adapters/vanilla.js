import { CalendarEngine } from '../picker/CalendarEngine.js';
import { RangePicker } from '../picker/RangePicker.js';
import { LOCALES } from '../core/locale.js';
import NepaliDate from '../core/NepaliDate.js';
import { ICONS } from '../icons.js';

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

export function createPicker(container, options = {}) {
  if (!(container instanceof HTMLElement)) {
    throw new Error('[NepaliDate] Container element is required');
  }

  const {
    range = false,
    inputSelector,
    format = 'YYYY-MM-DD',
    syncInput = false,
    openOnInit = false,
    ...engineOptions
  } = options;

  const EngineClass = range ? RangePicker : CalendarEngine;
  const engine = new EngineClass(engineOptions);
  const weekStartsOn = Number.isInteger(options.weekStartsOn) ? options.weekStartsOn : 0;
  const panel = document.createElement('div');
  panel.className = 'ndp-panel';

  let inputEl = null;
  let root = container;
  let wrapper = null;

  if (container.tagName === 'INPUT' || container.tagName === 'TEXTAREA') {
    inputEl = container;
    inputEl.classList.add('ndp-input');
    wrapper = document.createElement('div');
    wrapper.className = 'ndp-container ndp-input-wrapper';
    container.parentNode?.insertBefore(wrapper, container);
    wrapper.appendChild(container);
    root = wrapper;
  } else {
    root.classList.add('ndp-container');
  }

  root.appendChild(panel);

  if (inputSelector) {
    inputEl = document.querySelector(inputSelector);
    if (inputEl) inputEl.classList.add('ndp-input');
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

    if (syncInput && inputEl) {
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
    const path = event.composedPath();
    const target = path.find(el => el instanceof HTMLElement && el.hasAttribute('data-action'));
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
      if (range) {
        if (engine.selectionPhase === 'complete') close();
      } else {
        close();
      }
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

  root.addEventListener('click', onClick);
  root.addEventListener('mouseover', onHover);

  let isOpen = Boolean(openOnInit);
  const open = () => {
    if (isOpen) return;
    isOpen = true;
    panel.style.display = 'block';
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    panel.style.display = 'none';
  };

  const triggerEl = inputEl || root;
  const onTriggerClick = (event) => {
    if (event.target.closest('.ndp-panel')) return;
    open();
  };
  const onTriggerFocus = () => open();

  triggerEl.addEventListener('click', onTriggerClick);
  triggerEl.addEventListener('focusin', onTriggerFocus);

  const onDocClick = (event) => {
    const path = event.composedPath();
    if (path.includes(panel)) return;
    if (inputEl && path.includes(inputEl)) return;
    if (!inputEl && path.includes(root)) return;
    close();
  };
  document.addEventListener('click', onDocClick);

  // Bug 1 fix: set initial visibility directly, bypassing the isOpen guard in close()
  panel.style.display = 'none';
  if (openOnInit) open();

  return {
    engine,
    destroy() {
      unsubscribe();
      engine.destroy();
      root.removeEventListener('click', onClick);
      root.removeEventListener('mouseover', onHover);
      triggerEl.removeEventListener('click', onTriggerClick);
      triggerEl.removeEventListener('focusin', onTriggerFocus);
      document.removeEventListener('click', onDocClick);
      if (panel.parentNode) panel.parentNode.removeChild(panel);
      if (wrapper && inputEl && wrapper.parentNode) {
        wrapper.parentNode.insertBefore(inputEl, wrapper);
        wrapper.parentNode.removeChild(wrapper);
      }
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
