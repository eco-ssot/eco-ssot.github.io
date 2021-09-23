import clsx from 'clsx';
import { isNil } from 'lodash';

export default function Input({
  className,
  onChange = () => {},
  onBlur = () => {},
  value = '',
  placeholder = '',
  type = 'text',
  ...props
}) {
  return (
    <input
      value={isNil(value) ? '' : value}
      type={type}
      className={clsx(
        'bg-gray-50 bg-opacity-10 shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-10 rounded py-1 px-2 placeholder-gray-50 placeholder-opacity-50',
        className
      )}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      {...props}
    />
  );
}
