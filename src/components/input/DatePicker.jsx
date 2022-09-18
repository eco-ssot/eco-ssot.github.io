import { useId, useState } from 'react';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import { isNil } from 'lodash';
import ReactDatePicker from 'react-datepicker';

export default function DatePicker({
  className,
  containerClassName,
  value,
  label = '',
  onChange = () => {},
  showIcon = false,
  portalId = 'root-portal',
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  return (
    <div className={clsx('relative', containerClassName)}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={clsx(
          'relative flex h-full border border-gray-50 border-opacity-10 bg-gray-50 bg-opacity-10 hover:border-primary-600',
          focused && '!border-primary-600 ring-1 ring-primary-600',
          className
        )}
      >
        <ReactDatePicker
          onFocus={(e) => setFocused(true)}
          onClickOutside={(e) => setFocused(false)}
          onCalendarClose={(e) => setFocused(false)}
          id={id}
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
          {...(portalId && { portalId })}
        />
        {showIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <CalendarIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
