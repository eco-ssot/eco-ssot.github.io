export function toFormattedNumber(
  value,
  { unit = 1, precision = 0, suffix = '', defaultValue = '-', keepPrecision = false, maxPrecision = 4 } = {}
) {
  let nextPrecision = precision;
  if (keepPrecision) {
    nextPrecision = Math.min((String(value).split('.')[1] || '').length, maxPrecision);
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: nextPrecision,
    maximumFractionDigits: nextPrecision,
  }).format(value / unit);

  if (/NaN|∞|Infinity/gi.test(String(formattedValue))) {
    return defaultValue;
  }

  return `${formattedValue}${suffix}`;
}

export function getDecimalNumber(value = '') {
  const [num] = String(value).match(/[1-9]\d*(\.\d+)?/g) || [];
  return num;
}

export function trimNumber(value) {
  return Number(String(value).trim().replace(/,/g, ''));
}
