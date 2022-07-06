import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../../app/appSlice';

export default function Spinner() {
  const isLoading = useSelector(selectIsLoading);
  return (
    <Transition
      appear
      as={Fragment}
      show={isLoading}
      enter="transition-opacity duration-1000 ease-in-out delay-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        aria-label="spinner"
        className={clsx(
          'fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50',
          !isLoading && 'pointer-events-none'
        )}
      >
        <svg
          className="h-12 w-12 animate-spin text-primary-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </Transition>
  );
}
