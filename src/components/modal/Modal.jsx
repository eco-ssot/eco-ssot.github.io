import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

import Button from '../button/Button';
import IconButton from '../button/IconButton';

export default function Modal({ children, footer, open = false, title = '', setOpen = () => {} }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => {}}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-center align-middle transition-all transform bg-primary-900 shadow-xl">
              <Dialog.Title as="div" className="flex justify-center space-x-2 items-center py-2 bg-primary-800">
                <div className="text-xl font-medium text-gray-50">{title}</div>
                <IconButton className="absolute right-2" onClick={() => setOpen(false)}>
                  <XIcon className="h-5 w-5 " />
                </IconButton>
              </Dialog.Title>
              {children}
              {footer || (
                <div className="flex my-4 justify-center">
                  <Button onClick={() => setOpen(false)}>OK</Button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
