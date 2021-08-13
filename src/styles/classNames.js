import clsx from 'clsx';

export default function classNames(...classNames) {
  const className = clsx(classNames)
    .split(' ')
    .reduce((prev, curr) => ({ ...prev, [curr.split('-')[0]]: curr }), {});

  return Object.values(className).join(' ');
}
