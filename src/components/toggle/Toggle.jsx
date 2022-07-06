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
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
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
