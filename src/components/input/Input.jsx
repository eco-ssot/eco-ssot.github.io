import { useId } from 'react';

import clsx from 'clsx';
import { isNil } from 'lodash';

export default function Input({
  className,
  onChange = () => {},
  onBlur = () => {},
  value = '',
  placeholder = '',
  type = 'text',
  label = '',
  ...props
}) {
  const id = useId();
  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="whitespace-nowrap">
          {label}
        </label>
      )}
      <input
        id={id}
        value={isNil(value) ? '' : value}
        type={type}
        className={clsx(
          'block w-full rounded border-gray-50 border-opacity-10 bg-gray-50 bg-opacity-10 py-1 px-2 placeholder-gray-50 placeholder-opacity-50 shadow-sm hover:border-primary-600 focus:border-primary-600 focus:ring-primary-600',
          className
        )}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
