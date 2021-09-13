import clsx from 'clsx';

export default function Triangle({ className }) {
  return (
    <div
      className={clsx(
        'w-0 h-0 border-t-[0.25rem] border-t-transparent border-b-[0.25rem] border-b-transparent border-l-[0.5rem] border-l-primary-600',
        className
      )}
    />
  );
}
