import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function ButtonGroup({ className, options = [], selected = options[0] || {}, onChange = () => {} }) {
  const { t } = useTranslation(['component']);
  return (
    <div className={clsx('relative z-0 inline-flex shadow-sm rounded-md', className)}>
      {options.map(({ value, key = value }, i) => (
        <button
          key={key}
          type="button"
          className={clsx(
            'relative inline-flex items-center px-4 py-2 border border-primary-800 bg-transparent text-sm font-medium text-gray-50',
            i === 0 && 'rounded-r-none',
            i === options.length - 1 && 'rounded-l-none',
            i > 0 && '-ml-px',
            selected.value === value && 'bg-primary-800'
          )}
          onClick={() => onChange({ key, value })}>
          {t(`buttonGroup.${value}`)}
        </button>
      ))}
    </div>
  );
}
