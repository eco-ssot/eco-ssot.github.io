import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function Select({
  className,
  buttonClassName,
  optionClassName,
  label,
  options = [],
  selected = options[0] || {},
  onChange = () => {},
}) {
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className={clsx('flex items-center', className)}>
          {label && <Listbox.Label className="block font-medium text-gray-50">{label}</Listbox.Label>}
          <div className="relative">
            <Listbox.Button
              className={clsx(
                'bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600',
                open ? 'border-primary-600' : 'border-primary-800',
                buttonClassName
              )}>
              <span className="block truncate">{selected.value}</span>
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
                    key={option.key}
                    className={({ active }) =>
                      clsx(
                        active ? 'text-white bg-primary-600' : 'text-gray-50',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
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
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-2'
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
        </div>
      )}
    </Listbox>
  );
}
