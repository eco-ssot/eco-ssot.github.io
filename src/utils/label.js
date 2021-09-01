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

  return `Target：對比${baseYear || '去'}年${target}`;
}
