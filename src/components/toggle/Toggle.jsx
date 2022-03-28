import { useState } from 'react';

import { Switch } from '@headlessui/react';
import clsx from 'clsx';

export default function Toggle({ label, onChange = () => {} }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={(e) => {
          setEnabled(e);
          onChange(e);
        }}
        className={clsx(
          enabled ? 'bg-primary-700' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600'
        )}>
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      {label && (
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm font-medium">{label}</span>
        </Switch.Label>
      )}
    </Switch.Group>
  );
}
