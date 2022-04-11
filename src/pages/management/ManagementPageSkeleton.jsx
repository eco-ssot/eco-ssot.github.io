import { useLocation } from 'react-router-dom';

import GoalSkeleton from './GoalSkeleton';
import ManagementSkeleton from './ManagementSkeleton';

export default function ManagementPageSkeleton() {
  const { pathname } = useLocation();
  return (
    <div className="grid h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full grid-cols-8 grid-rows-2 gap-4 overflow-hidden p-4">
      <div className="col-span-1 row-span-2">
        <div className="flex h-full flex-col rounded bg-primary-900 py-4 shadow"></div>
      </div>
      {pathname === '/management' || pathname === '/management/goal' ? <GoalSkeleton /> : <ManagementSkeleton />}
    </div>
  );
}
