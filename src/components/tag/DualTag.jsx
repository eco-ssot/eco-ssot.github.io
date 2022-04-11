import clsx from 'clsx';

import Divider from '../divider/Divider';

export default function DualTag({ className, labels = [] }) {
  const [left, right] = labels;
  return (
    <div className={clsx('flex h-8 items-center rounded border-primary-600 bg-primary-800 px-2 shadow', className)}>
      <div>{left}</div>
      <Divider className="ml-0 h-5 border-r-2 border-primary-600" />
      <div>{right}</div>
    </div>
  );
}
