import clsx from 'clsx';

export default function IconButton({ className, children, disabled, onClick = () => {}, ...props }) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none',
        disabled && 'cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      <div {...(disabled && { className: 'opacity-50' })}>{children}</div>
    </button>
  );
}
