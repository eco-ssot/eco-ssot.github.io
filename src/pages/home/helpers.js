import { isNil } from 'lodash';
import { isValid } from 'date-fns';

import { baseFormatter } from '../../utils/formatter';

export function formatTarget(target) {
  const nextTarget = baseFormatter(target);
  if (nextTarget === '-') {
    return '-';
  }

  if (target >= 0) {
    return `+${nextTarget}`;
  }

  return nextTarget;
}

export function formatYtm(date) {
  if (!isValid(new Date(date))) {
    return '-';
  }

  const month = new Date(date).getMonth() + 1;
  if (month === 1) {
    return '1月';
  }

  return `1-${month}月`;
}

export function getTarget(base, target) {
  if (isNil(base) || isNil(target)) {
    return null;
  }

  return base * (1 + target * 1e-2);
}
