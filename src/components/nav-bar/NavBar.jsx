import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { privateRoutes } from '../../router/routes';

export default function NavBar({ className }) {
  const { pathname } = useLocation();
  return (
    <div className={clsx('flex flex-grow space-x-4', className)}>
      {privateRoutes.map(({ path, title }) => (
        <div
          key={path}
          className={
            pathname === path
              ? 'border-primary-500 text-white inline-flex items-center px-1 pt-1 border-b-2'
              : 'border-b-2 border-header text-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1'
          }>
          <Link to={path} className="text-current text-lg font-medium">
            {title}
          </Link>
        </div>
      ))}
    </div>
  );
}
