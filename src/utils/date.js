import { max, isValid } from 'date-fns';

import APP_CONSTANTS from '../app/appConstants';

export function formatMonthRange(date, periodType = APP_CONSTANTS.PERIOD_TYPES.YTM) {
  return date && isValid(new Date(date))
    ? `${new Date(date).getFullYear()}.${periodType === APP_CONSTANTS.PERIOD_TYPES.YTM ? '01 - ' : ''}${String(
        new Date(date).getMonth() + 1
      ).padStart(2, 0)}`
    : '-';
}

export function getMaxDate(...dates) {
  const maxDate = max(dates.filter(Boolean).map((d) => new Date(d)));
  return isValid(maxDate) ? String(maxDate) : '-';
}
