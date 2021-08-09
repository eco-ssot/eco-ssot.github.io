import { useState } from 'react';
import clsx from 'clsx';

export default function ButtonGroup({ className, options = [], defaultValue = options[0] || {} }) {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <div className={clsx('relative z-0 inline-flex shadow-sm rounded-md', className)}>
      {options.map(({ label, key = label }, i) => (
        <button
          key={key}
          type="button"
          className={clsx(
            'relative inline-flex items-center px-4 py-2 border border-header bg-transparent text-sm font-medium text-gray-50',
            i === 0 && 'rounded-r-none',
            i === options.length - 1 && 'rounded-l-none',
            selected.label === label && 'bg-header'
          )}
          onClick={() => setSelected({ label, key })}>
          {label}
        </button>
      ))}
    </div>
  );
}
