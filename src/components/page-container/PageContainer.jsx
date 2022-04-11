import clsx from 'clsx';

export default function PageContainer({ className, children }) {
  return (
    <div className="h-auto w-full p-4">
      <div className={clsx('h-[calc(100vh-6rem)] rounded bg-primary-900 p-4', className)}>{children}</div>
    </div>
  );
}
