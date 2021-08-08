import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function Arrow({ className, direction = null }) {
  if (direction === null) {
    return null;
  }

  return direction === 'up' ? (
    <ArrowUpIcon className={clsx(`transform rotate-45`, className)} />
  ) : (
    <ArrowDownIcon className={clsx(`transform -rotate-45`, className)} />
  );
}
