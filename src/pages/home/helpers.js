import { isValid, format } from 'date-fns';
import { isNil } from 'lodash';

export function formatYtm(date, lng = 'en') {
  if (!isValid(new Date(date))) {
    return '-';
  }

  const month = new Date(date).getMonth() + 1;
  if (month === 1) {
    return lng === 'zh' ? '1月' : 'Jan.';
  }

  return lng === 'zh' ? `1-${month}月` : `Jan-${format(new Date(date), 'MMM')}`;
}

export function formatTarget(target, lng = 'en') {
  if (isNil(target)) {
    return '-';
  }

  if (lng === 'zh') {
    return target;
  }

  return target.replace(/下降/, 'Baseline - ');
}
