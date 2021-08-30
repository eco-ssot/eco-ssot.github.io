import { get } from 'lodash';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value, option = {}) => toFormattedNumber(get(value, 'value', value), option);

export const ratioFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { unit: 1e-2, suffix: '%', ...option });

export const keepPrecisionFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { ...option, keepPrecision: true });

export const targetFormatter =
  (target, { formatter = originalFormatter, ...option } = {}) =>
  ({ value, ...cell }) => {
    if (/NaN|∞|Infinity|-/.test(String(value))) {
      return '-';
    }

    const val = /^revenue$|^asp$|^revenue.delta$|^asp.delta$/gi.test(cell.column.id) ? value * -1 : value;
    return (
      <div className={val > target ? 'text-_red' : val < target && cell.row.original.isFooter ? 'text-green-500' : ''}>
        {formatter(value, option)}
      </div>
    );
  };
