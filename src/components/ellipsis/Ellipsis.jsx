import { useEffect, useState, useRef } from 'react';

import clsx from 'clsx';
import { useWindowSize } from 'react-use';

import Tooltip from '../tooltip/Tooltip';

export default function Ellipsis({ label, className, placement = 'auto' }) {
  const ref = useRef();
  const { width } = useWindowSize();
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    setIsTruncated(ref.current?.offsetWidth < ref.current?.scrollWidth);
  }, [label, width]);

  return (
    <Tooltip label={label} placement={placement} show={isTruncated}>
      <span className="block truncate">
        <span ref={ref} className={clsx('block truncate', className)}>
          {label}
        </span>
      </span>
    </Tooltip>
  );
}
