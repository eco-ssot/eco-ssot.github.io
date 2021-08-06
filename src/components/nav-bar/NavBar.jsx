import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { privateRoutes } from '../../router/routes';

export default function NavBar({ className, match, ...props }) {
  return (
    <div className={clsx('flex', className)} {...props}>
      {privateRoutes.map(({ path, title }) => (
        <div
          key={path}
          className={clsx('flex items-center justify-center mr-auto', {
            'border-0 border-b border-solid border-primary': match.path === path,
          })}>
          <Link to={path} className="text-current text-lg">
            {title}
          </Link>
        </div>
      ))}
    </div>
  );
}
