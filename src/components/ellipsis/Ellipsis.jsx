import { useEffect, useState, useRef } from 'react';

import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';
import { useMeasure } from 'react-use';

export default function Ellipsis({ label, className }) {
  const ref = useRef();
  const [containerRef, { width }] = useMeasure();
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    setIsTruncated(ref.current.offsetWidth < ref.current.scrollWidth);
  }, [width]);

  return (
    <span ref={containerRef} className="block truncate">
      <span ref={ref} className={clsx('block truncate', className)} data-tip data-for={label}>
        {label}
      </span>
      <ReactTooltip id={label} effect="solid" className={clsx('bg-gray-900 !px-2 !py-1', !isTruncated && '!invisible')}>
        <span>{label}</span>
      </ReactTooltip>
    </span>
  );
}
