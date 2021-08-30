import { getDecimalNumber } from './number';

export function getTargetLabel(target = '', baseYear = '', isHistory = false) {
  if (target === '') {
    return 'Target：-';
  }

  if (isHistory) {
    return `Target：對比${baseYear}${target}`;
  }

  if (/逐年/.test(target)) {
    const currYear = new Date().getFullYear();
    const diffYears = currYear - baseYear;
    const pct = Number(getDecimalNumber(target));
    return `Target：對比${baseYear}年下降${diffYears * pct}%`;
  }

  if (/占比/.test(target)) {
  }

  return `Target：${baseYear ? `${baseYear}年` : ''}${target}`;
}
