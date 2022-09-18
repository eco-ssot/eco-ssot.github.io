import { cloneElement, isValidElement, useMemo, useRef, useState } from 'react';

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
import { mergeRefs } from 'react-merge-refs';

const FLIP_SIDES = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

export default function CustomTooltip({
  children,
  className,
  arrowClassName,
  strategy = 'fixed',
  placement = 'auto',
  show = true,
  showArrow = true,
  interactive = true,
  render = () => <></>,
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
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: 50,
      ...(interactive && { handleClose: safePolygon({ blockPointerEvents: false, restMs: 50 }) }),
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const nextChildren = useMemo(
    () => (typeof children === 'function' ? children({ open }) : children),
    [children, open]
  );

  const ref = useMemo(() => mergeRefs([reference, nextChildren.ref]), [reference, nextChildren]);
  return (
    <>
      {isValidElement(nextChildren) && cloneElement(nextChildren, getReferenceProps({ ref, ...nextChildren.props }))}
      <FloatingPortal>
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
            })}
          >
            <Transition.Child
              enter="transition-opacity ease-in-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {render({
                close: () => {
                  setOpen(false);
                  refs.reference.current.focus();
                },
              })}
              {showArrow && (
                <div
                  className={clsx('absolute -z-1 h-3 w-3 rotate-45 bg-gray-800', arrowClassName)}
                  ref={arrowRef}
                  style={{
                    top: middlewareData?.arrow?.y ? middlewareData?.arrow?.y + middlewareData?.arrow?.centerOffset : '',
                    left: middlewareData?.arrow?.x
                      ? middlewareData?.arrow?.x + middlewareData?.arrow?.centerOffset
                      : '',
                    [FLIP_SIDES[_placement.split('-')[0]]]: '-0.375rem',
                  }}
                />
              )}
            </Transition.Child>
          </div>
        </Transition>
      </FloatingPortal>
    </>
  );
}
