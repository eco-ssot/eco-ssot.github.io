import clsx from 'clsx';

import Picture from '../picture/Picture';

export default function SuspenseIcon({ className }) {
  return (
    <div className={clsx('flex h-screen w-screen flex-col items-center justify-center space-y-2', className)}>
      <Picture className="h-32 w-32 animate-pulse" src="/logo-128x128.webp" fallback="/logo-128x128.png" alt="logo" />
    </div>
  );
}
