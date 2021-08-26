import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { privateRoutes } from '../../router/routes';
import { selectBusiness } from '../../renderless/location/locationSlice';

export default function NavBar({ className }) {
  const { pathname } = useLocation();
  const business = useSelector(selectBusiness);
  return (
    <div className={clsx('flex flex-grow space-x-4', className)}>
      {privateRoutes.map(({ path, title, component: Component }) => (
        <div
          key={path}
          className={
            pathname === path
              ? 'border-primary-600 text-gray-50 inline-flex items-center px-1 pt-1 border-b-2'
              : 'border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1'
          }>
          <Link
            to={{
              pathname: path,
              state: { from: pathname },
              ...(business && { search: `?business=${business}` }),
            }}
            className="text-current text-lg font-medium"
            onMouseEnter={() => Component.preload()}>
            <span className="block truncate">{title}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
