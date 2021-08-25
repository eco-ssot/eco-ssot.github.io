import { isValid } from 'date-fns';

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
