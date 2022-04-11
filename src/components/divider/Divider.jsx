import clsx from 'clsx';

export default function Divider({ className }) {
  return <div className={clsx('mx-4 h-4 border-0 border-r border-divider', className)} />;
}
