import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

export default function LinkButtonGroup({ className, routes = [] }) {
  const { pathname } = useLocation();
  return (
    <div className={clsx('relative z-0 inline-flex shadow-sm rounded-md', className)}>
      {routes.map(({ path, label }, i) => (
        <Link
          key={i}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 border border-primary-800 bg-transparent text-sm font-medium text-gray-50',
            i === 0 && 'rounded-r-none',
            i === routes.length - 1 && 'rounded-l-none',
            path === pathname && 'bg-primary-800'
          )}
          to={path}>
          {label}
        </Link>
      ))}
    </div>
  );
}
