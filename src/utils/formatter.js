import { get } from 'lodash';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value, option = {}) => toFormattedNumber(get(value, 'value', value), option);

export const ratioFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { unit: 1e-2, suffix: '%', ...option });

export const keepPrecisionFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { ...option, keepPrecision: true });
