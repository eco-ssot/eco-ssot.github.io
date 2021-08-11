import clsx from 'clsx';

export default function Avatar({ className, children }) {
  return <div className={clsx(className)}>{children}</div>;
}
