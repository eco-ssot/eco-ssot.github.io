import Goal from './Goal';

import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import APP_CONFIG from '../../constants/app-config';

export default function ManagementPage() {
  return (
    <div className="grid grid-cols-6 grid-rows-2 min-h-[calc(100vh-4rem)] h-full w-full p-4 gap-4">
      <div className="row-span-2 col-span-1">
        <div className="bg-primary-900 rounded shadow p-4 h-full flex flex-col">
          <div className="flex flex-grow flex-col space-y-8">
            <div>管理者資訊</div>
            <div className="space-y-2">
              <div className="text-primary-600">User Name</div>
              <div>Vivienne CL Huang</div>
              <div>黃千千</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary-600">Department</div>
              <div>DMA130</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary-600">ID</div>
              <div>K8906K84</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary-600">Level</div>
              <div>系統管理者</div>
            </div>
          </div>
          <div className="border-t border-divider text-center">
            <Button className="mt-4">登出</Button>
          </div>
        </div>
      </div>
      <div className="row-span-1 col-span-5">
        <div className="bg-primary-900 rounded shadow p-4 h-full space-y-4">
          <div className="flex justify-between">
            <div>年度目標</div>
            <div className="flex items-center">
              <Select label="查詢年度：" options={APP_CONFIG.YEAR_OPTIONS} />
            </div>
          </div>
          <Goal />
        </div>
      </div>
      <div className="row-span-1 col-span-2">
        <div className="bg-primary-900 rounded shadow p-4 h-full">
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <div>碳排放係數</div>
              <div className="text-unit">(兆瓦時/公噸)</div>
            </div>
            <div className="flex items-center">
              <Select label="查詢年度：" options={APP_CONFIG.YEAR_OPTIONS} />
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-1 col-span-3">
        <div className="bg-primary-900 rounded shadow p-4 h-full">
          <div className="flex justify-between">
            <div>綠證</div>
            <div className="flex items-center">
              <Select label="查詢年度：" options={APP_CONFIG.YEAR_OPTIONS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
