import { useEffect, useState, useRef } from 'react';

import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useMeasure } from 'react-use';

export default function Ellipsis({ label, className, placement = 'auto' }) {
  const ref = useRef();
  const [containerRef, { width }] = useMeasure();
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    setIsTruncated(ref.current.offsetWidth < ref.current.scrollWidth);
  }, [width]);

  return (
    <Tippy content={label} placement={placement} className={clsx(!isTruncated && '!invisible')}>
      <span ref={containerRef} className="block truncate">
        <span ref={ref} className={clsx('block truncate', className)}>
          {label}
        </span>
      </span>
    </Tippy>
  );
}
