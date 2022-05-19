import { isValid } from 'date-fns';
import { isNil } from 'lodash';

import APP_CONSTANTS from '../../app/appConstants';

export function formatYtm(date) {
  if (!isValid(new Date(date))) {
    return '-';
  }

  const month = new Date(date).getMonth() + 1;
  if (month === 1) {
    return '1';
  }

  return `1-${month}`;
}

export function formatTarget(target = '', lng = 'en') {
  if (isNil(target)) {
    return '-';
  }

  if (lng === 'zh') {
    return target;
  }

  return String(target).replace(/下降/, 'Baseline - ');
}

export function getChartLabel({ isNewMargin, baseYear, compareYear, periodType, currMonth, currentYear, latestDate }) {
  return [
    ...(isNewMargin
      ? []
      : [
          `${baseYear} Total`,
          `${compareYear} ${periodType === APP_CONSTANTS.PERIOD_TYPES.MONTH ? currMonth : formatYtm(latestDate)}`,
        ]),
    `${currentYear} ${periodType === APP_CONSTANTS.PERIOD_TYPES.MONTH ? currMonth : formatYtm(latestDate)}`,
  ];
}
