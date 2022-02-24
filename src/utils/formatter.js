import clsx from 'clsx';
import { get } from 'lodash';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value, option = {}) => toFormattedNumber(get(value, 'value', value), option);

export const ratioFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { unit: 1e-2, suffix: '%', ...option });

export const keepPrecisionFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { ...option, keepPrecision: true });

export const targetFormatter =
  (target, { className, reverse = false, formatter = originalFormatter, ...option } = {}) =>
  ({ value, ...cell }) => {
    const val =
      /^revenue$|^asp$|^revenue.delta$|^asp.delta$|^production/gi.test(cell.column.id) || reverse ? value * -1 : value;

    return (
      <div
        className={clsx(
          target === 0 || isNaN(Number(value)) || !isFinite(Number(value))
            ? ''
            : val > target
            ? 'text-dangerous-500 font-semibold'
            : val < target && 'text-green-500 font-semibold',
          className
        )}>
        {formatter(value, option)}
      </div>
    );
  };
