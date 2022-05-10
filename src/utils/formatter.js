import clsx from 'clsx';
import { get } from 'lodash';

import APP_CONSTANTS from '../app/appConstants';

import { toFormattedNumber } from './number';

export const originalFormatter = (value) => get(value, 'value', value);
export const baseFormatter = (value, option = {}) => toFormattedNumber(get(value, 'value', value), option);
export const statisticsFormatter = (value, option = {}) =>
  toFormattedNumber(get(value, 'value', value), { precision: APP_CONSTANTS.BASE_NUMBER_PRECISION, ...option });

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
            ? 'font-semibold text-dangerous-500'
            : val < target && 'font-semibold text-green-500',
          className
        )}>
        {formatter(value, option)}
      </div>
    );
  };
