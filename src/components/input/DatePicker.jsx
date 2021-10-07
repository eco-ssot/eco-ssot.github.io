import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

export default function DatePicker({ className, value, onChange }) {
  return (
    <div className={clsx('relative flex h-full bg-gray-50 bg-opacity-10', className)}>
      <ReactDatePicker
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy-mm-dd"
        onChange={(date) => onChange(format(date, 'yyyy-MM-dd'))}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="flex pt-4 px-6 w-full justify-between items-center">
            <ChevronLeftIcon
              className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-50"
              onClick={() => decreaseMonth()}
            />
            <div className="flex h-full items-center">{format(monthDate, 'MMM yyyy')}</div>
            <ChevronRightIcon
              className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-50"
              onClick={() => increaseMonth()}
            />
          </div>
        )}
        {...(value && { selected: new Date(value) })}
      />
    </div>
  );
}
