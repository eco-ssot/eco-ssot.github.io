import { cloneElement, Fragment, isValidElement, useEffect, useRef, useState } from 'react';

import {
  offset,
  shift,
  arrow,
  autoUpdate,
  autoPlacement,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from '@floating-ui/react-dom-interactions';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

const FLIP_SIDES = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

export default function Tooltip({ children, label, placement, className, strategy = 'fixed', show = true }) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    floating,
    context,
    refs,
    update,
    middlewareData,
    strategy: _strategy,
    placement: _placement,
  } = useFloating({
    open,
    strategy,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      shift({ padding: 8 }),
      autoPlacement(),
      ...(arrowRef.current ? [arrow({ element: arrowRef.current })] : []),
    ],
    ...(placement && { placement }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [refs.reference, refs.floating, update, open]);

  return (
    <>
      {isValidElement(children) && cloneElement(children, getReferenceProps({ ref: reference }))}
      <Transition appear show={show && open}>
        <div
          {...getFloatingProps({
            ref: floating,
            className: 'z-50',
            style: {
              position: _strategy,
              top: y ?? '',
              left: x ?? '',
            },
          })}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className={clsx('whitespace-nowrap rounded bg-gray-800 py-1 px-2 text-base shadow', className)}>
              {label}
              <div
                className="absolute h-3 w-3 rotate-45 bg-gray-800"
                ref={arrowRef}
                style={{
                  top: middlewareData?.arrow?.y ? middlewareData?.arrow?.y + middlewareData?.arrow?.centerOffset : '',
                  left: middlewareData?.arrow?.x ? middlewareData?.arrow?.x + middlewareData?.arrow?.centerOffset : '',
                  [FLIP_SIDES[_placement.split('-')[0]]]: '-0.375rem',
                }}
              />
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}
