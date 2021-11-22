export function formatTarget(target, lng = 'en') {
  if (lng === 'en') {
    return target.replace(/下降/, '-').replace(/占比/, 'Percentage');
  }

  return target;
}
