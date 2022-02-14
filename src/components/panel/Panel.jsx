import clsx from 'clsx';

export default function Panel({ children, className, to, title = null, subtitle = null }) {
  return (
    <div className={clsx('bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2', className)}>
      <div className="h-auto flex justify-between">
        {to && <div className="text-xl font-medium hover:text-gray-50">{title}</div>}
        {subtitle}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
