import clsx from 'clsx';

export default function Tag({ className, children }) {
  return (
    <div
      className={clsx(
        'flex h-8 items-center rounded border-l-4 border-primary-600 bg-primary-800 px-2 shadow',
        className
      )}
    >
      {children}
    </div>
  );
}
