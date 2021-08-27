import { get } from 'lodash';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value, option = {}) => toFormattedNumber(get(value, 'value', value), option);

export const ratioFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { unit: 1e-2, suffix: '%', ...option });

export const keepPrecisionFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { ...option, keepPrecision: true });

export const targetFormatter =
  (target, { formatter = originalFormatter, targetColor = 'text-gray-50' } = {}) =>
  (value, option = {}) => {
    if (/NaN|∞|Infinity|-/.test(String(value))) {
      return '-';
    }

    return (
      <div className={value < target ? 'text-_red' : value > target ? targetColor : ''}>{formatter(value, option)}</div>
    );
  };
