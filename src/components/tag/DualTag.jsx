import clsx from 'clsx';

import Divider from '../divider/Divider';

export default function DualTag({ className, labels = [] }) {
  const [left, right] = labels;
  return (
    <div className={clsx('flex h-8 rounded shadow px-2 bg-primary-800 border-primary-600 items-center', className)}>
      <div>{left}</div>
      <Divider className="border-primary-600 border-r-2 h-5" />
      <div>{right}</div>
    </div>
  );
}
