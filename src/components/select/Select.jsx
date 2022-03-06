import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import Ellipse from '../ellipsis/Ellipsis';

export default function Select({
  className,
  buttonClassName,
  optionClassName,
  label,
  options = [],
  selected = options[0] || {},
  placeholder = '',
  splitter = ':',
  ariaLabel = '',
  onChange = () => {},
}) {
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className={clsx('flex items-center', className)}>
          {label && (
            <>
              <Listbox.Label className="block truncate font-medium text-gray-50 mr-1">{label}</Listbox.Label>
              {splitter && <div className="mr-1">{splitter}</div>}
            </>
          )}
          <div className="relative">
            <Listbox.Button
              {...(ariaLabel && { 'aria-label': ariaLabel })}
              className={clsx(
                'bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9',
                open ? 'border-primary-600' : 'border-primary-800',
                buttonClassName
              )}>
              <span className={clsx('block truncate', options.length === 0 && 'opacity-50')}>
                {options.length === 0 ? placeholder : selected.value}
              </span>
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
                className={clsx(
                  'absolute z-10 mt-1 w-full bg-primary-900 shadow-lg max-h-60 rounded-md py-1 overflow-auto border border-divider focus:outline-none text-sm',
                  optionClassName
                )}>
                {options.map((option) => (
                  <Listbox.Option
                    aria-label={`option-${option.key}`}
                    disabled={option.disabled}
                    key={option.key}
                    className={({ active }) =>
                      clsx(
                        active ? 'text-gray-50 bg-primary-600' : 'text-gray-50',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={option}>
                    {({ selected, active, disabled }) => (
                      <>
                        <Ellipse
                          place="left"
                          label={option.value}
                          className={clsx(selected ? 'font-semibold' : 'font-normal', disabled && 'opacity-50')}
                        />
                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-gray-50' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-2'
                            )}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
                {options.length === 0 && (
                  <Listbox.Option disabled className="text-gray-50 cursor-default select-none relative py-2 pl-3 pr-9">
                    <span className="block truncate opacity-50">No Options</span>
                  </Listbox.Option>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
