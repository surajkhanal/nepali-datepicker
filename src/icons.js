const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
const SVG_CLOSE = '</svg>';

export const ICONS = {
  chevronLeft: `${SVG_OPEN}<polyline points="15 18 9 12 15 6" />${SVG_CLOSE}`,
  chevronRight: `${SVG_OPEN}<polyline points="9 18 15 12 9 6" />${SVG_CLOSE}`,
  chevronsLeft: `${SVG_OPEN}<polyline points="18 18 12 12 18 6" /><polyline points="12 18 6 12 12 6" />${SVG_CLOSE}`,
  chevronsRight: `${SVG_OPEN}<polyline points="6 18 12 12 6 6" /><polyline points="12 18 18 12 12 6" />${SVG_CLOSE}`,
  chevronUp: `${SVG_OPEN}<polyline points="18 15 12 9 6 15" />${SVG_CLOSE}`,
  chevronDown: `${SVG_OPEN}<polyline points="6 9 12 15 18 9" />${SVG_CLOSE}`,
  calendar: `${SVG_OPEN}<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />${SVG_CLOSE}`,
  xCircle: `${SVG_OPEN}<circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />${SVG_CLOSE}`,
  check: `${SVG_OPEN}<polyline points="20 6 9 17 4 12" />${SVG_CLOSE}`,
  todayDot: `${SVG_OPEN}<circle cx="12" cy="12" r="3" />${SVG_CLOSE}`,
};
