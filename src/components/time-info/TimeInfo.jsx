import { useState } from 'react';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useInterval } from 'react-use';

export default function TimeInfo({ className }) {
  const [date, setDate] = useState(new Date());
  useInterval(() => setDate(new Date()), 1000);
  return <div className={clsx('block truncate', className)}>{format(date, 'yyyy.MM.dd HH:mm')}</div>;
}
