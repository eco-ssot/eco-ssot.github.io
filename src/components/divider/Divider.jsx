import clsx from 'clsx';

export default function Divider({ className, ...props }) {
  return (
    <div
      className={clsx('h-4 mx-4 border-0 border-r border-solid border-gray-500', className)}
      {...props}
    />
  );
}
