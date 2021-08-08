import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';

export default function TimeInfo({ className, ...rest }) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={clsx(className)} {...rest}>
      {format(date, 'yyyy年 MM月 dd日 HH:mm')}
    </div>
  );
}
