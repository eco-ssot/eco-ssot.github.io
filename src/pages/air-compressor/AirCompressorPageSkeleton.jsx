import clsx from 'clsx';

import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';

export default function AirCompressorPageSkeleton() {
  return (
    <div className="-mt-16 flex h-screen w-screen flex-col space-y-4 overflow-hidden p-4 pt-20">
      <div className={clsx('rounded bg-primary-900 p-4 shadow')}>
        <div className="text-xl font-medium">空壓設備智能推薦</div>
        <div className="flex flex-grow justify-center space-x-8">
          <div className="space-y-4 border-r-2 border-divider pr-8">
            <div>欲評估設備</div>
            <div className="flex space-x-4">
              <Select buttonClassName="min-w-32" label="廠區資訊" />
              <Select buttonClassName="min-w-32" label="設備編號" />
            </div>
          </div>
          <div className="space-y-4 border-r-2 border-divider pr-8">
            <div>新機台規格</div>
            <div className="flex space-x-4">
              <Select buttonClassName="min-w-32" label="潤滑類型" />
              <Select buttonClassName="min-w-32" label="壓縮類型" />
              <Select buttonClassName="min-w-32" label="運轉類型" />
            </div>
          </div>
          <Button className="self-end">計算能效</Button>
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
