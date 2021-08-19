import currency from 'currency.js';

export function toFormattedNumber(
  value,
  {
    separator = ',',
    symbol = '',
    precision = 0,
    unit = 1,
    suffix = '',
    defaultValue = '-',
    keepPrecision = false,
    maxPrecision = 3,
  } = {}
) {
  try {
    const val = currency(value, { errorOnInvalid: true });
    return `${currency(val.divide(unit), {
      separator,
      symbol,
      errorOnInvalid: true,
      precision,
      ...(keepPrecision && {
        precision: Math.min((String(value).split('.')[1] || '').length, maxPrecision),
      }),
    }).format()}${suffix}`;
  } catch {
    return defaultValue;
  }
}
