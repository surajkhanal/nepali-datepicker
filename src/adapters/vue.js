import { ref, onBeforeUnmount } from 'vue';
import { CalendarEngine } from '../picker/CalendarEngine.js';
import { RangePicker } from '../picker/RangePicker.js';

export function useNepaliDatePicker(options = {}) {
  const state = ref(null);
  const EngineClass = options.range ? RangePicker : CalendarEngine;
  const engine = new EngineClass(options);
  const unsubscribe = engine.subscribe((s) => {
    state.value = s;
  });

  onBeforeUnmount(() => {
    unsubscribe();
    engine.destroy();
  });

  return {
    state,
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
