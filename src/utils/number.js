import currency from 'currency.js';

export function toFormattedNumber(
  value,
  { separator = ',', symbol = '', precision = 0, unit = 1, suffix = '' } = {}
) {
  return `${currency(currency(value).divide(unit), {
    separator,
    symbol,
    precision,
  }).format()}${suffix}`;
}
