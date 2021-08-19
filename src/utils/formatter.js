import { get } from 'lodash';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), option);

export const ratioFormatter = (value, { precision = 0 } = {}) => {
  const val = (get(value, 'value', value) / 1e-2).toFixed(precision);
  return isNaN(val) ? '-' : `${val}%`;
};

export const keepPrecisionFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { ...option, keepPrecision: true });
