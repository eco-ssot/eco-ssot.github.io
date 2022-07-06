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
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react-dom-interactions';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

const FLIP_SIDES = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

export default function Tooltip({
  children,
  label,
  className,
  strategy = 'fixed',
  placement = 'auto',
  show = true,
  interactive = false,
}) {
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
      ...(placement === 'auto' ? [autoPlacement()] : []),
      ...(arrowRef.current ? [arrow({ element: arrowRef.current })] : []),
    ],
    ...(placement !== 'auto' && { placement }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, interactive ? { handleClose: safePolygon({ restMs: 25 }) } : undefined),
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
      <FloatingPortal>
        <Transition appear show={show && open && !!label}>
          <div
            {...getFloatingProps({
              ref: floating,
              className: 'z-100',
              style: {
                position: _strategy,
                top: y ?? '',
                left: x ?? '',
              },
            })}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-in-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={clsx('whitespace-nowrap rounded bg-gray-800 py-1 px-2 shadow', className)}>
                {label}
                <div
                  className="absolute h-3 w-3 rotate-45 bg-gray-800"
                  ref={arrowRef}
                  style={{
                    top: middlewareData?.arrow?.y ? middlewareData?.arrow?.y + middlewareData?.arrow?.centerOffset : '',
                    left: middlewareData?.arrow?.x
                      ? middlewareData?.arrow?.x + middlewareData?.arrow?.centerOffset
                      : '',
                    [FLIP_SIDES[_placement.split('-')[0]]]: '-0.375rem',
                  }}
                />
              </div>
            </Transition.Child>
          </div>
        </Transition>
      </FloatingPortal>
    </>
  );
}
