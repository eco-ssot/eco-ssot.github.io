import { max } from 'date-fns';

export function formatMonthRange(date) {
  return date ? `${new Date(date).getFullYear()}.01 - ${String(new Date(date).getMonth() + 1).padStart(2, 0)}` : '-';
}

export function getMaxDate(...dates) {
  const maxDate = max(dates.filter(Boolean).map((d) => new Date(d)));
  return maxDate;
}
