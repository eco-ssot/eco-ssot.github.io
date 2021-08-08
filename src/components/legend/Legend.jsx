import clsx from 'clsx';

export default function Legend({ className, dotClassName, labelClassName, label, ...rest }) {
  return (
    <div className={clsx('flex items-center space-x-2', className)} {...rest}>
      <div className={clsx('h-2 w-2 rounded-lg', dotClassName)} />
      <div className={clsx(labelClassName)}>{label}</div>
    </div>
  );
}
