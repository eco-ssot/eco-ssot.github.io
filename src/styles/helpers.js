import clsx from 'clsx';

export function overrideTwCss(className) {
  return clsx(className)
    .split(' ')
    .map((val) => `${val}`)
    .join(' ');
}
