import { useEffect, useState, useRef } from 'react';

import clsx from 'clsx';
import { nanoid } from 'nanoid';
import ReactTooltip from 'react-tooltip';
import { useMeasure } from 'react-use';

export default function Ellipsis({ label, className, place }) {
  const id = nanoid();
  const ref = useRef();
  const [containerRef, { width }] = useMeasure();
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    setIsTruncated(ref.current.offsetWidth < ref.current.scrollWidth);
  }, [width]);

  return (
    <span ref={containerRef} className="block truncate">
      <span ref={ref} className={clsx('block truncate', className)} data-tip data-for={id}>
        {label}
      </span>
      <ReactTooltip
        id={id}
        effect="solid"
        className={clsx('bg-gray-900 !px-2 !py-1', !isTruncated && '!invisible')}
        {...(place && { place })}>
        <span>{label}</span>
      </ReactTooltip>
    </span>
  );
}
