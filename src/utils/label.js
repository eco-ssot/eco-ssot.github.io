export function getTargetLabel(target = '', baseYear = '', isHistory = false) {
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
