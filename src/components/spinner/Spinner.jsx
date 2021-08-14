import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { selectIsLoading } from '../../renderless/loader/loaderSlice';

export default function Spinner() {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div
      className={clsx(
        'fixed flex items-center justify-center inset-0 transition-all bg-gray-900 bg-opacity-50 ease-in-out duration-1000 w-screen h-screen',
        isLoading ? 'z-50 opacity-100' : 'z-0 opacity-0'
      )}>
      <svg
        className="animate-spin h-12 w-12 text-primary-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}
