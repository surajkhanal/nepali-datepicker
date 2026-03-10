import { useEffect, useMemo, useState } from 'react';
import { CalendarEngine } from '../picker/CalendarEngine.js';
import { RangePicker } from '../picker/RangePicker.js';

export function useNepaliDatePicker(options = {}) {
  const EngineClass = options.range ? RangePicker : CalendarEngine;
  const engine = useMemo(() => new EngineClass(options), [EngineClass]);
  const [state, setState] = useState(engine.getState());

  useEffect(() => {
    const unsubscribe = engine.subscribe(setState);
    return () => {
      unsubscribe();
      engine.destroy();
    };
  }, [engine]);

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

export function NepaliDatePicker({ options, children }) {
  const picker = useNepaliDatePicker(options);
  return children(picker);
}
