import React, { cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

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
import clsx from 'clsx';

const FLIP_SIDES = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

export default function Tooltip({ children, label, placement, className, show = true }) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    refs,
    update,
    middlewareData,
    placement: _placement,
  } = useFloating({
    open,
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
    useHover(context, { delay: { open: 500 }, restMs: 50 }),
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
      {show && open && (
        <>
          <div
            {...getFloatingProps({
              ref: floating,
              className: clsx(
                'bg-gray-800 rounded shadow py-1 px-2 text-base whitespace-nowrap transition-opacity z-20',
                className
              ),
              style: {
                position: strategy,
                top: y ?? '',
                left: x ?? '',
              },
            })}>
            {label}
            <div
              className="h-3 w-3 rotate-45 bg-gray-800"
              ref={arrowRef}
              style={{
                position: strategy,
                top: middlewareData?.arrow?.y ? middlewareData?.arrow?.y + middlewareData?.arrow?.centerOffset : '',
                left: middlewareData?.arrow?.x ? middlewareData?.arrow?.x + middlewareData?.arrow?.centerOffset : '',
                [FLIP_SIDES[_placement.split('-')[0]]]: '-0.375rem',
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
