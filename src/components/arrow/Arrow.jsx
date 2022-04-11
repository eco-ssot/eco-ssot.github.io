import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function Arrow({ className, direction = null }) {
  if (direction === null) {
    return null;
  }

  return direction === 'up' ? (
    <ArrowUpIcon className={clsx(`rotate-45 transform`, className)} />
  ) : (
    <ArrowDownIcon className={clsx(`-rotate-45 transform`, className)} />
  );
}
