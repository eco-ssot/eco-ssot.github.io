import clsx from 'clsx';

export default function Button({ size = 'middle', type = '', className, children }) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-50 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        size === 'small' && 'leading-4 px-3',
        size === 'large' && 'text-base',
        type === 'primary' &&
          'border-transparent　text-gray-50 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        type === 'secondary' &&
          'border-transparent　text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500',
        className
      )}>
      {children}
    </button>
  );
}
