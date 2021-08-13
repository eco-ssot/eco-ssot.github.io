import { useState } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { useInterval } from 'react-use';

export default function TimeInfo({ className }) {
  const [date, setDate] = useState(new Date());
  useInterval(() => setDate(new Date()), 1000);
  return <div className={clsx(className)}>{format(date, 'yyyy年 MM月 dd日 HH:mm')}</div>;
}
