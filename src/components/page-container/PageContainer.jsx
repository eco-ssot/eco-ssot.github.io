import clsx from 'clsx';

export default function PageContainer({ className, children }) {
  return (
    <div className="min-h-page h-auto w-full p-4">
      <div className={clsx('bg-panel rounded min-h-page-panel h-auto p-4 space-y-4', className)}>
        {children}
      </div>
    </div>
  );
}
