import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import Divider from '../divider/Divider';

export default function TagSelect({
  className,
  children,
  label,
  queryKey,
  options = [],
  selected = options[0] || {},
  onChange = () => {},
}) {
  return (
    <div className="w-auto h-8 items-center flex rounded shadow bg-primary-800">
      <div className="pl-3">{children}</div>
      <Divider className="border-primary-600" />
      <Listbox value={selected} onChange={(e) => queryKey && onChange({ [queryKey]: e.key })}>
        {({ open }) => (
          <>
            {label && <Listbox.Label className="font-medium">{label}</Listbox.Label>}
            <div className={clsx('relative', className)}>
              <Listbox.Button className="flex space-x-2 pl-2 py-1 items-center bg-transparent relative w-full text-left cursor-pointer">
                <div className="block truncate">{selected.value}</div>
                <div className="inset-y-0 right-0 flex pr-2 items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-gray-50" aria-hidden="true" />
                </div>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-primary-900 shadow-lg max-h-60 rounded py-1 overflow-auto border border-divider text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.key}
                      className={({ active }) =>
                        clsx(
                          active ? 'text-gray-50 bg-primary-600' : 'text-gray-50',
                          'flex cursor-default select-none relative py-1 pl-2'
                        )
                      }
                      value={option}>
                      {({ selected, active }) => (
                        <>
                          <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {option.value}
                          </span>
                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-gray-50' : 'text-primary-600',
                                'absolute inset-y-0 right-0 flex items-center pr-2'
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
