import clsx from 'clsx';

export default function PageContainer({ className, children }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] h-auto w-full p-4">
      <div className={clsx('bg-primary-900 rounded min-h-[calc(100vh-6rem)] h-auto p-4', className)}>{children}</div>
    </div>
  );
}
