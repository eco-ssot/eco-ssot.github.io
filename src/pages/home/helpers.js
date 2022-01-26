import { isValid } from 'date-fns';
import { isNil } from 'lodash';

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
