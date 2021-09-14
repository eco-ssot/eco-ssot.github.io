import clsx from 'clsx';

export default function Dot({ className, color = 'bg-dangerous-700' }) {
  return (
    <span className={clsx('flex h-3 w-3', className)}>
      <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${color}`}></span>
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></span>
    </span>
  );
}
