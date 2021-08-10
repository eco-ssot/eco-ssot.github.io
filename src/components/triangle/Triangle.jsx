import clsx from 'clsx';

export default function Triangle({ className }) {
  return (
    <div
      className={clsx(
        'w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-primary-500 opacity-75',
        className
      )}
    />
  );
}
