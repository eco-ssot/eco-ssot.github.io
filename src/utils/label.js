import { getDecimalNumber } from './number';

export function getTargetLabel(target = '', baseYear = '', isHistory = false, lng = 'en') {
  if (lng === 'en') {
    if (target === '') {
      return 'Target：-';
    }

    if (/占比|佔比/.test(target)) {
      return `Target：${target.replace(/占比|佔比/, 'Percentage')}`;
    }

    const decimalNumber = getDecimalNumber(target);
    if (isHistory) {
      return `Target：-${decimalNumber}% compared to ${baseYear || 'last year'}`;
    }

    return `Target：-${decimalNumber}% compared to ${baseYear || 'last year'}`;
  }

  if (target === '') {
    return '目標：-';
  }

  if (/占比|佔比/.test(target)) {
    return `目標：${target}`;
  }

  if (isHistory) {
    return `目標：對比${baseYear || '去'}年${target}`;
  }

  return `目標：對比${baseYear || '去'}年${target}`;
}
