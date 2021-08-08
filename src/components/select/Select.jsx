import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function Select({ className, options = [] }) {
  const [selected, setSelected] = useState(options[0] || {});
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className={clsx('mt-1 relative', className)}>
            <Listbox.Button
              className={clsx(
                'bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 hover:border-primary-500 sm:text-sm',
                open ? 'border-primary-500' : 'border-header'
              )}>
              <span className="block truncate text-lg">{selected.value}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                className="absolute z-10 mt-1 w-full bg-panel shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto border border-solid border-gray-300 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.key}
                    className={({ active }) =>
                      clsx(
                        active ? 'text-white bg-primary-600' : 'text-gray-900 dark:text-gray-50',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}
