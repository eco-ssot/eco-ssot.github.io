import clsx from 'clsx';

export default function Legend({ className, dotClassName, labelClassName, label }) {
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <div className={clsx('h-3 w-3 flex-shrink-0 rounded-full', dotClassName)} />
      <div className={clsx(labelClassName)}>{label}</div>
    </div>
  );
}
