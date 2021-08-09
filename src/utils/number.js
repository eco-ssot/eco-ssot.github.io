import currency from 'currency.js';

export function toFormattedNumber(
  value,
  { separator = ',', symbol = '', precision = 0, unit = 1, suffix = '', defaultValue = '-' } = {}
) {
  try {
    const val = currency(value, { errorOnInvalid: true });
    return `${currency(val.divide(unit), {
      separator,
      symbol,
      precision,
      errorOnInvalid: true,
    }).format()}${suffix}`;
  } catch {
    return defaultValue;
  }
}
