import clsx from 'clsx';

export default function IconButton({ className, children, onClick = () => {} }) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 bg-transparent focus:outline-none',
        className
      )}
      onClick={onClick}>
      {children}
    </button>
  );
}
