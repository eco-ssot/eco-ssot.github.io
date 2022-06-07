import clsx from 'clsx';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';

export default function AirCompressorPageSkeleton() {
  return (
    <div className="-mt-16 flex h-screen w-screen flex-col space-y-4 overflow-hidden p-4 pt-20">
      <div className={clsx('rounded bg-primary-900 p-4 shadow')}>
        <div className="mb-4 text-xl font-medium">空壓設備智能推薦</div>
        <div className="flex flex-grow justify-center space-x-8">
          <div className="space-y-2 border-r-2 border-divider pr-8">
            <div className="font-medium">欲評估設備</div>
            <div className="flex space-x-2">
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="廠區資訊" />
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="設備編號" />
              <div className="flex items-end space-x-1">
                <Input
                  className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                  label="保養成本"
                  placeholder="非必填"
                />
                <div className="-translate-y-1 text-gray-300">萬元</div>
              </div>
            </div>
          </div>
          <div className="space-y-2 border-r-2 border-divider pr-8">
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <div className="font-medium">新機台規格</div>
                <div className="cursor-pointer font-medium text-primary-600 underline">常用規格</div>
              </div>
              <div className="flex space-x-2">
                <div className="cursor-pointer font-medium text-primary-600 underline">加入常用規格</div>
                <div className="cursor-pointer text-gray-300 underline">清除</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="潤滑類型" />
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="壓縮類型" />
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="運轉類型" />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label="額定功率"
                placeholder="Type here"
              />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label="額定排氣量"
                placeholder="Type here"
              />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label="額定能效"
                placeholder="Type here"
              />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label="購置新機費用"
                placeholder="Type here"
              />
              <Input
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label="品牌 / 型號"
                placeholder="非必填"
              />
            </div>
          </div>
          <Button className="self-center">計算能效</Button>
        </div>
      </div>
      <div className="grid flex-grow grid-rows-2 gap-4 overflow-auto">
        <div className="row-span-1 flex space-x-8 overflow-auto rounded bg-primary-900 p-4 shadow">
          <div className="flex w-[40%] flex-col space-y-4">
            <div className="text-xl font-medium">設備能效 / ROI資訊</div>
          </div>
          <div className="flex w-[30%] flex-col">
            <div className="flex justify-between">
              <div>設備能效近一週狀況</div>
              <div className="flex translate-y-8 -translate-x-12 space-x-4">
                <Legend label="一級能效值" dotClassName="bg-_blue" />
                <Legend label="二級能效值" dotClassName="bg-_orange" />
                <Legend label="三級能效值" dotClassName="bg-_yellow" />
              </div>
            </div>
          </div>
          <div className="flex w-[30%] flex-col">
            <div>設備ROI近一週狀況</div>
          </div>
        </div>
        <div className="row-span-1 flex space-x-4 overflow-auto rounded bg-primary-900 p-4 shadow">
          <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">既有備機設備推薦資訊</div>
          </div>
          <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">新機設備推薦資訊</div>
          </div>
          <div className="flex w-[28%] flex-col space-y-4">
            <div className="flex justify-between">
              <div className="text-xl font-medium">汰換後累積減少成本預估</div>
              <div className="flex space-x-4">
                <Legend label="備機設備" dotClassName="bg-_blue" />
                <Legend label="新設備" dotClassName="bg-_yellow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
