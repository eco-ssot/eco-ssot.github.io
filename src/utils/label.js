import { getDecimalNumber } from './number';

export function getTargetLabel(target = '', baseYear = '', isHistory = false) {
  if (target === '') {
    return 'Target：-';
  }

  if (/占比|佔比/.test(target)) {
    return `Target：${target}`;
  }

  if (isHistory) {
    return `Target：對比${baseYear || '去'}年${target}`;
  }

  if (/逐年/.test(target)) {
    const currYear = new Date().getFullYear();
    const diffYears = currYear - baseYear;
    const pct = Number(getDecimalNumber(target));
    return `Target：對比${baseYear}年下降${diffYears * pct}%`;
  }

  return `Target：對比${baseYear || '去'}年${target}`;
}
