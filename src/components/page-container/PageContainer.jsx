import clsx from 'clsx';

export default function PageContainer({ className, children }) {
  return (
    <div className="h-auto w-full p-4">
      <div className={clsx('bg-primary-900 rounded h-[calc(100vh-6rem)] p-4', className)}>{children}</div>
    </div>
  );
}
