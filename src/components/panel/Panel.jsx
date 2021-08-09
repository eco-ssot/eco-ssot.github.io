import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Panel({ children, className, to, title = null, subtitle = null }) {
  return (
    <div className={clsx('bg-panel rounded shadow p-4 h-full', className)}>
      <div className="h-1/6 flex justify-between">
        <Link className="text-gray-200 hover:text-white" to={to}>
          {title}
        </Link>
        {subtitle}
      </div>
      <div className="h-5/6">{children}</div>
    </div>
  );
}
