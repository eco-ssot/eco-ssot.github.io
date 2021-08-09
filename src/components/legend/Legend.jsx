import clsx from 'clsx';

export default function Legend({ className, dotClassName, labelClassName, label }) {
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <div className={clsx('min-h-3 min-w-3 rounded-1/2', dotClassName)} />
      <div className={clsx(labelClassName)}>{label}</div>
    </div>
  );
}
