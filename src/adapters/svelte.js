import { readable } from 'svelte/store';
import { CalendarEngine } from '../picker/CalendarEngine.js';
import { RangePicker } from '../picker/RangePicker.js';

export function createNepaliPickerStore(options = {}) {
  const EngineClass = options.range ? RangePicker : CalendarEngine;
  const engine = new EngineClass(options);

  const store = readable(engine.getState(), (set) => {
    const unsubscribe = engine.subscribe(set);
    return () => {
      unsubscribe();
      engine.destroy();
    };
  });

  return {
    subscribe: store.subscribe,
    engine,
    goToPrevMonth: () => engine.goToPrevMonth(),
    goToNextMonth: () => engine.goToNextMonth(),
    goToPrevYear: () => engine.goToPrevYear(),
    goToNextYear: () => engine.goToNextYear(),
    goToToday: () => engine.goToToday(),
    setViewMode: (mode) => engine.setViewMode(mode),
    selectDate: (date) => engine.selectDate(date),
    clearSelection: () => engine.clearSelection(),
    hoverDate: (date) => engine.hoverDate?.(date),
    setRange: (start, end) => engine.setRange?.(start, end),
    clearRange: () => engine.clearRange?.(),
  };
}
