import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import { isNil } from 'lodash';
import ReactDatePicker from 'react-datepicker';

export default function DatePicker({ className, value, onChange }) {
  return (
    <div className={clsx('relative flex h-full bg-gray-50 bg-opacity-10', className)}>
      <ReactDatePicker
        portalId="root-portal"
        dateFormat="yyyy-MM-dd"
        placeholderText="yyyy-mm-dd"
        onChange={(date) => onChange(isNil(date) ? null : format(date, 'yyyy-MM-dd'))}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="flex w-full items-center justify-between px-6 pt-4">
            <ChevronLeftIcon
              className="h-6 w-6 cursor-pointer text-gray-300 hover:text-gray-50"
              onClick={() => decreaseMonth()}
            />
            <div className="flex h-full items-center">{format(monthDate, 'MMM yyyy')}</div>
            <ChevronRightIcon
              className="h-6 w-6 cursor-pointer text-gray-300 hover:text-gray-50"
              onClick={() => increaseMonth()}
            />
          </div>
        )}
        {...(value && { selected: new Date(value) })}
      />
    </div>
  );
}
