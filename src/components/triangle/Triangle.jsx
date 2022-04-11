import clsx from 'clsx';

export default function Triangle({ className }) {
  return (
    <div
      className={clsx(
        'h-0 w-0 border-t-[0.25rem] border-b-[0.25rem] border-l-[0.5rem] border-t-transparent border-b-transparent border-l-primary-600',
        className
      )}
    />
  );
}
