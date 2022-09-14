import clsx from 'clsx';

export default function Dot({ className, color = 'bg-dangerous-700', animation = true }) {
  return (
    <div className={clsx('relative flex h-3 w-3', className)}>
      {animation && (
        <div className={`absolute inline-flex h-3 w-3 animate-ping rounded-full opacity-75 ${color}`}></div>
      )}
      <div className={`relative inline-flex h-3 w-3 rounded-full ${color}`}></div>
    </div>
  );
}
