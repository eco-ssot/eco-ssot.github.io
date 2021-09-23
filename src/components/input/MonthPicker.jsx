import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

export default function MonthPicker({ className }) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={clsx('relative flex', className)}>
      <DatePicker
        showMonthYearPicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MM/yyyy"
        renderCustomHeader={({ monthDate, decreaseYear, increaseYear }) => (
          <div className="flex pt-4 px-6 w-full justify-between items-center">
            <ChevronLeftIcon
              className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-50"
              onClick={() => decreaseYear()}
            />
            <div className="flex h-full items-center">{format(monthDate, 'yyyy')}</div>
            <ChevronRightIcon
              className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-50"
              onClick={() => increaseYear()}
            />
          </div>
        )}
      />
    </div>
  );
}
