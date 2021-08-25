import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Panel({ children, className, to, title = null, subtitle = null }) {
  return (
    <div className={clsx('bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2', className)}>
      <div className="h-auto flex justify-between">
        {to && (
          <Link className="text-gray-200 hover:text-gray-50" to={to}>
            {title}
          </Link>
        )}
        {subtitle}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
