import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function TagSelect({ className, children, options = [] }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="w-auto h-8 gap-3 items-center grid grid-cols-2 divide-primary-500 divide-x rounded shadow bg-header">
      <div className="pl-3">{children}</div>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className={clsx('relative', className)}>
              <Listbox.Button
                className={clsx('bg-transparent relative w-full pl-3 text-left cursor-pointer')}>
                <span className="block truncate">{selected.value}</span>
                <span className="absolute inset-y-0 right-0 flex pr-3 items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-panel shadow-lg max-h-60 rounded py-1 overflow-auto border border-gray-300 text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.key}
                      className={({ active }) =>
                        clsx(
                          active ? 'text-white bg-primary-600' : 'text-gray-900 dark:text-gray-50',
                          'cursor-default select-none relative py-1 px-3'
                        )
                      }
                      value={option}>
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}>
                            {option.value}
                          </span>
                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-white' : 'text-primary-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}>
                              <CheckIcon className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
