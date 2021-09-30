import clsx from 'clsx';
import { isNil } from 'lodash';

export default function Textarea({ className, rows = 3, value = '', onChange = () => {}, onBlur = () => {} }) {
  return (
    <textarea
      rows={rows}
      className={clsx(
        'bg-gray-50 bg-opacity-10 shadow-sm block w-full hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 border border-divider rounded-md bg-transparent border-opacity-50',
        className
      )}
      value={isNil(value) ? '' : value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
