import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Panel({ children, className, to, title = null, ...props }) {
  return (
    <Link
      className={clsx(
        'bg-panel rounded shadow p-4 text-current hover:text-current h-full',
        className
      )}
      to={to}
      {...props}>
      <div className="h-1/6">{title}</div>
      <div className="h-5/6">{children}</div>
    </Link>
  );
}
