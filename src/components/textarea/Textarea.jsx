import { useState } from 'react';

import clsx from 'clsx';
import { isNil } from 'lodash';

export default function Textarea({ className, rows = 0, value = '', onChange = () => {}, onBlur = () => {} }) {
  const [_rows, setRows] = useState(rows);
  return (
    <textarea
      rows={_rows || String(value).split('\n').length || 1}
      className={clsx(
        'block w-full rounded-md border border-divider border-opacity-50 bg-gray-50 bg-transparent bg-opacity-10 shadow-sm hover:border-primary-600 focus:border-primary-600 focus:ring-primary-600',
        className
      )}
      value={isNil(value) ? '' : value}
      onChange={(e) => {
        setRows(e.target.value.split('\n').length || 1);
        onChange(e);
      }}
      onBlur={onBlur}
    />
  );
}
