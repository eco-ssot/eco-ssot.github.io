import clsx from 'clsx';

export default function Avatar({ className, children }) {
  return <div className={clsx('block truncate', className)}>{children}</div>;
}
