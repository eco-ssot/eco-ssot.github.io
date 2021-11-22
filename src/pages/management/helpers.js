export function formatTarget(target, lng = 'en') {
  console.log({ target, lng });
  if (lng === 'en') {
    return target.replace(/下降/, '-').replace(/占比/, 'Percentage');
  }

  return target;
}
