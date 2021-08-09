import clsx from 'clsx';

export default function Tag({ className, children }) {
  return (
    <div
      className={clsx(
        'flex h-8 pt-1 rounded shadow px-2 bg-primary-900 border-l-4 border-primary-600',
        className
      )}>
      {children}
    </div>
  );
}
