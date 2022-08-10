import { Fragment, useState } from 'react';

import { Transition, Dialog as HeadlessDialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function Dialog({
  children,
  className,
  title,
  titleClassName,
  disabled = false,
  open = false,
  disableClose = false,
  render = () => <></>,
  afterClose = () => {},
}) {
  const [_open, setOpen] = useState(open);
  return (
    <>
      <div className={clsx('relative', disabled && 'pointer-events-none')} onClick={() => setOpen(true)}>
        {children}
      </div>
      <Transition appear show={_open} as={Fragment}>
        <HeadlessDialog
          onClose={() => {
            if (!disableClose) {
              setOpen(false);
              afterClose();
            }
          }}
          className={clsx('relative z-50', !_open && 'pointer-events-none')}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="flex min-h-full items-center justify-center">
                <HeadlessDialog.Panel className={clsx('w-screen max-w-7xl rounded shadow', className)}>
                  {title && (
                    <div className={clsx('relative flex items-center justify-center', titleClassName)}>
                      <div className="text-lg font-medium">{title}</div>
                      <button
                        className="absolute right-4 focus:outline-none"
                        onClick={() => {
                          setOpen(false);
                          afterClose();
                        }}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  {render({
                    open: _open,
                    close: () => {
                      setOpen(false);
                      afterClose();
                    },
                  })}
                </HeadlessDialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </HeadlessDialog>
      </Transition>
    </>
  );
}
