import clsx from 'clsx';

const variants = {
  primary:
    'inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600',
  plain:
    'inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-base font-medium rounded text-gray-900 bg-gray-50 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-gray-300',
  danger:
    'inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900 focus:ring-red-600',
};

export default function Button({ className, children, variant = 'primary', onClick = () => {}, ...props }) {
  return (
    <button
      type="button"
      className={clsx(variants[variant] || variants.primary, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
