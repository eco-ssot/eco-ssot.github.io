import { Fragment, useEffect } from 'react';

import { useFloating, autoUpdate, autoPlacement } from '@floating-ui/react-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useMeasure } from 'react-use';

import Ellipsis from '../ellipsis/Ellipsis';

export default function Select({
  className,
  buttonClassName,
  optionClassName,
  label,
  options = [],
  selected = options[0] || {},
  placeholder = 'Select',
  splitter = ':',
  ariaLabel = '',
  strategy: _strategy = 'absolute',
  placement: _placement = 'bottom',
  onChange = () => {},
}) {
  const [ref, { width }] = useMeasure();
  const { x, y, reference, floating, update, strategy, refs } = useFloating({
    strategy: _strategy,
    ...(_placement !== 'auto' && { placement: _placement }),
    middleware: [
      ...(_placement === 'auto' ? [autoPlacement({ padding: 8, allowedPlacements: ['top', 'bottom'] })] : []),
    ],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className={clsx('flex items-center', className)}>
          {label && (
            <>
              <Listbox.Label className="mr-1 block truncate font-medium text-gray-50">{label}</Listbox.Label>
              {splitter && <div className="mr-1">{splitter}</div>}
            </>
          )}
          <div className="relative" ref={ref}>
            <Listbox.Button
              ref={reference}
              className={clsx(
                'min-h-9 w-full cursor-pointer rounded-md border border-divider bg-transparent py-1 pl-3 pr-10 text-left shadow-sm hover:border-primary-600 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600',
                open ? 'border-primary-600' : 'border-primary-800',
                buttonClassName
              )}
              {...(ariaLabel && { 'aria-label': ariaLabel })}>
              <span className={clsx('block truncate', options.length === 0 && 'opacity-50')}>
                <Ellipsis label={options.length === 0 ? placeholder : selected.value} />
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <div
              className="z-10"
              ref={floating}
              style={{
                width,
                position: strategy,
                top: y ?? '',
                left: x ?? '',
              }}>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  className={clsx(
                    'z-10 my-1 max-h-60 w-full overflow-auto rounded-md border border-divider bg-primary-900 py-1 text-sm shadow-lg focus:outline-none',
                    optionClassName
                  )}>
                  {options.map((option) => (
                    <Listbox.Option
                      aria-label={`option-${option.key}`}
                      disabled={option.disabled}
                      key={option.key}
                      className={({ active }) =>
                        clsx(
                          active ? 'bg-primary-600 text-gray-50' : 'text-gray-50',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={option}>
                      {({ selected, active, disabled }) => (
                        <>
                          <Ellipsis
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
                    <Listbox.Option
                      disabled
                      className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-50">
                      <Ellipsis label="No Options" className="opacity-50"></Ellipsis>
                    </Listbox.Option>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </div>
      )}
    </Listbox>
  );
}
