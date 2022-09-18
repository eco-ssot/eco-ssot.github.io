import { ChevronLeftIcon } from '@heroicons/react/24/solid';

import Tag from '../../components/tag/Tag';

export default function AnalysisPageSkeleton() {
  return (
    <div className="flex h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-screen flex-col gap-4 overflow-hidden p-4">
      <div className="text-xl font-medium">&#8203;</div>
      <div className="flex items-end justify-between">
        <div className="flex cursor-pointer items-center space-x-2 text-gray-300 hover:text-green-50">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>返回上一頁</div>
        </div>
        <Tag>累計區間 : </Tag>
      </div>
      <div className="grid flex-grow grid-cols-7 grid-rows-5 gap-4 overflow-auto">
        <div className="col-span-7 row-span-2 grid h-full w-full grid-cols-5 divide-x divide-divider rounded bg-primary-900 py-8 shadow"></div>
        <div className="col-span-5 row-span-3 flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow"></div>
        <div className="col-span-2 row-span-3 flex flex-col rounded bg-primary-900 p-4 shadow"></div>
      </div>
    </div>
  );
}
