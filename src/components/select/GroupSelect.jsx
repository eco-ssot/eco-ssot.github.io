import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import Ellipsis from '../ellipsis/Ellipsis';

export default function GroupSelect({
  className,
  buttonClassName,
  parentKey,
  childKey,
  options = [],
  selected = options[0] || {},
  ariaLabel = '',
  disabled = false,
  onChange = () => {},
}) {
  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        onChange(
          e.key === 'ALL'
            ? { [parentKey]: null, [childKey]: null }
            : {
                [e.group ? parentKey : childKey]: e.key,
                ...(e.group && { [childKey]: null }),
                ...(!e.group && { [parentKey]: e.parent }),
              }
        );
      }}
    >
      {({ open }) => (
        <>
          <div className={clsx('relative mt-1 min-w-36', disabled && 'cursor-not-allowed', className)}>
            <Listbox.Button
              {...(ariaLabel && { 'aria-label': `select-${ariaLabel}` })}
              className={clsx(
                'relative w-full cursor-pointer rounded-md border bg-transparent py-2 pl-3 pr-10 text-left shadow-sm hover:border-primary-600 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600',
                open ? 'border-primary-600' : 'border-primary-800',
                disabled && 'pointer-events-none bg-primary-900 opacity-50',
                buttonClassName
              )}
            >
              <Ellipsis className="text-lg" label={selected.alias || selected.value} />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-50" aria-hidden="true" />
              </span>
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
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-divider bg-primary-900 py-1 text-base shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none"
              >
                {options.map((option) => (
                  <Listbox.Option
                    aria-label={`option-${option.key}`}
                    key={option.key}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-primary-600 text-gray-50' : 'text-gray-50',
                        'relative cursor-default select-none pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <Ellipsis
                          label={option.value}
                          className={clsx(
                            'py-2',
                            selected ? 'font-semibold' : 'font-normal',
                            !option.group && 'border-l-2 border-primary-700 pl-2'
                          )}
                        />
                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-gray-50' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
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
