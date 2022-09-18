import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import Ellipsis from '../ellipsis/Ellipsis';

export default function TagSelect({
  className,
  label,
  queryKey,
  options = [],
  selected = options[0] || {},
  splitter = ':',
  onChange = () => {},
}) {
  return (
    <Listbox value={selected} onChange={(e) => queryKey && onChange({ [queryKey]: e.key })}>
      {({ open }) => (
        <>
          {label && (
            <>
              <Listbox.Label className="font-medium">{label}</Listbox.Label>
              {splitter && <div className="ml-1">{splitter}</div>}
            </>
          )}
          <div className={clsx('relative', className)}>
            <Listbox.Button className="relative flex w-full cursor-pointer items-center space-x-2 bg-transparent py-1 pl-2 text-left">
              <div className="block truncate">{selected.value}</div>
              <div className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-4 w-4 text-gray-50" aria-hidden="true" />
              </div>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-divider bg-primary-900 py-1 text-sm shadow-lg"
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.key}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-primary-600 text-gray-50' : 'text-gray-50',
                        'relative flex cursor-default select-none py-1 pl-2'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <Ellipsis label={option.value} className={clsx(selected ? 'font-semibold' : 'font-normal')} />
                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-gray-50' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-2'
                            )}
                          >
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
  );
}
