import clsx from 'clsx';
import { isNil } from 'lodash';

export default function FileInput({
  className,
  onChange = () => {},
  onBlur = () => {},
  value = '',
  placeholder = '',
  ...props
}) {
  return (
    <input
      value={isNil(value) ? '' : value}
      type="file"
      className={clsx('bg-transparent border border-divider rounded px-2 py-1', className)}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      {...props}
    />
  );
}
