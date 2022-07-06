import clsx from 'clsx';

export default function IconButton({ className, children, disabled, onClick = () => {}, ...props }) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center rounded-full border border-transparent p-1 text-gray-50 shadow-sm focus:outline-none',
        disabled && 'cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div {...(disabled && { className: 'opacity-50' })}>{children}</div>
    </button>
  );
}
