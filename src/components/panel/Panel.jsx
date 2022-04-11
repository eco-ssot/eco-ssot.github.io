import clsx from 'clsx';

export default function Panel({ children, className, to, title = null, subtitle = null }) {
  return (
    <div className={clsx('flex h-full flex-col space-y-2 rounded bg-primary-900 p-4 shadow', className)}>
      <div className="flex h-auto justify-between">
        {to && <div className="text-xl font-medium hover:text-gray-50">{title}</div>}
        {subtitle}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
