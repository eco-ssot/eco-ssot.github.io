import clsx from 'clsx';

export default function Tag({ className, children }) {
  return (
    <div
      className={clsx(
        'flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600',
        className
      )}>
      {children}
    </div>
  );
}
