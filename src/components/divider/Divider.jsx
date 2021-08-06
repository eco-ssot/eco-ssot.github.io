import clsx from 'clsx';

export default function Divider({ className, ...props }) {
  return (
    <div
      className={clsx('h-4 mx-2 border-0 border-r border-solid border-divider', className)}
      {...props}
    />
  );
}
