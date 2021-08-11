import { get } from 'lodash';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value) => toFormattedNumber(get(value, 'value', value));
export const ratioFormatter = (value) =>
  toFormattedNumber(get(value, 'value', value), { unit: 1e-2, suffix: '%' });
