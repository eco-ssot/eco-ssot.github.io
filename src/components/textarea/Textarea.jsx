import clsx from 'clsx';

export default function Textarea({ className, rows = 3, value = '', onChange = () => {}, onBlur = () => {} }) {
  return (
    <textarea
      rows={rows}
      className={clsx(
        'bg-gray-50 bg-opacity-20 shadow-sm block w-full hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 border border-divider rounded-md bg-transparent',
        className
      )}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
