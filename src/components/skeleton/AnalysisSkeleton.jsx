import { ChevronLeftIcon } from '@heroicons/react/solid';

import Tag from '../tag/Tag';

export default function AnalysisSkeleton() {
  return (
    <div className="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden">
      <div className="text-xl font-medium">&#8203;</div>
      <div className="flex justify-between items-end">
        <div className="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50">
          <ChevronLeftIcon className="w-5 h-5" />
          <div>返回上一頁</div>
        </div>
        <Tag>累計區間：</Tag>
      </div>
      <div className="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto">
        <div className="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5"></div>
        <div className="row-span-3 col-span-5 bg-primary-900 rounded shadow p-4 space-y-4 flex flex-col h-full"></div>
        <div className="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col"></div>
      </div>
    </div>
  );
}
