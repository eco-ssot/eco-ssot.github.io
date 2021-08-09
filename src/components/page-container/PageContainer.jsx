import clsx from 'clsx';

export default function PageContainer({ className, children }) {
  return (
    <div className="h-page w-full p-4">
      <div className={clsx('bg-panel rounded h-full p-4 space-y-4', className)}>{children}</div>
    </div>
  );
}
