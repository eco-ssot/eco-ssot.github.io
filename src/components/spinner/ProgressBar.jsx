import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

import { selectIsLoadingPage } from '../../app/appSlice';

export default function ProgressBar() {
  const isLoadingPage = useSelector(selectIsLoadingPage);
  return (
    <Transition
      appear
      as={Fragment}
      show={isLoadingPage}
      enter="transition-[width] duration-200 ease-in-out delay-100"
      enterFrom="w-0"
      enterTo="w-[95vw]"
      // leave="transition-[width] duration-75 ease-in-out delay-100"
      // leaveFrom="w-[95vw]"
      // leaveTo="w-[100vw]"
    >
      <div className="absolute left-0 top-0 z-100 h-1 w-0 bg-primary-600"></div>
    </Transition>
  );
}
