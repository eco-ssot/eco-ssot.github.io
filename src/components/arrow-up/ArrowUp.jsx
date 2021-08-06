import clsx from 'clsx';

export default function ArrowUp({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('h-6 w-6', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  );
}
