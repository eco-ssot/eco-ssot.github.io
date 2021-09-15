import clsx from 'clsx';

export default function Dot({ className, color = 'bg-dangerous-700' }) {
  return (
    <div className={clsx('flex h-3 w-3', className)}>
      <div className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${color}`}></div>
      <div className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></div>
    </div>
  );
}
