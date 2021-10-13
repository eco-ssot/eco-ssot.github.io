import { useState } from 'react';

import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';

export default function PopperWrapper({ ReferenceComponent, PopperComponent }) {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'preventOverflow', enabled: true },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button as="div" ref={setReferenceElement}>
            {ReferenceComponent && <ReferenceComponent />}
          </Popover.Button>
          <Popover.Panel className="relative z-50" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            {PopperComponent && <PopperComponent />}
            <div ref={setArrowElement} style={styles.arrow} />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
