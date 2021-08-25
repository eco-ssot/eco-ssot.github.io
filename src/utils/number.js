export function toFormattedNumber(
  value,
  { unit = 1, precision = 0, suffix = '', defaultValue = '-', keepPrecision = false, maxPrecision = 4 } = {}
) {
  if (/Infinity/gi.test(String(value))) {
    return `${value}${suffix}`;
  }

  let nextPrecision = precision;
  if (keepPrecision) {
    nextPrecision = Math.min((String(value).split('.')[1] || '').length, maxPrecision);
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: nextPrecision,
    maximumFractionDigits: nextPrecision,
  }).format(value / unit);

  if (/NaN|∞/gi.test(String(formattedValue))) {
    return defaultValue;
  }

  return `${formattedValue}${suffix}`;
}
