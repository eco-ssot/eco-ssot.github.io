import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function GroupSelect({
  className,
  buttonClassName,
  parentKey,
  childKey,
  options = [],
  selected = options[0] || {},
  onChange = () => {},
}) {
  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        onChange({
          [e.group ? parentKey : childKey]: e.key,
          ...(e.group && { [childKey]: null }),
          ...(!e.group && { [parentKey]: e.parent }),
        });
      }}>
      {({ open }) => (
        <>
          <div className={clsx('mt-1 relative min-w-32', className)}>
            <Listbox.Button
              className={clsx(
                'bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600',
                open ? 'border-primary-600' : 'border-primary-800',
                buttonClassName
              )}>
              <span className="block truncate text-lg">{selected.alias || selected.value}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-50" aria-hidden="true" />
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
                className="absolute z-10 mt-1 w-full bg-primary-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-900 ring-opacity-5 overflow-auto border border-divider focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.key}
                    className={({ active }) =>
                      clsx(
                        active ? 'text-gray-50 bg-primary-600' : 'text-gray-50',
                        'cursor-default select-none relative pl-3 pr-9'
                      )
                    }
                    value={option}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate py-2',
                            !option.group && 'border-l-2 border-primary-700 pl-2'
                          )}>
                          {option.value}
                        </span>
                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-gray-50' : 'text-primary-600',
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
