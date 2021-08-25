export function formatMonthRange(date) {
  return date ? `${new Date(date).getFullYear()}.01 - ${String(new Date(date).getMonth() + 1).padStart(2, 0)}` : '-';
}
