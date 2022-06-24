import clsx from 'clsx';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';

export default function AirCompressorPageSkeleton() {
  return (
    <div className="-mt-16 flex h-screen w-screen flex-col space-y-4 overflow-hidden p-4 pt-20">
      <div className={clsx('rounded bg-primary-900 p-4 shadow')}>
        <div className="mb-4 text-xl font-medium"></div>
        <div className="flex flex-grow justify-center space-x-8">
          <div className="space-y-2 border-r-2 border-divider pr-8">
            <div className="font-medium"></div>
            <div className="flex space-x-2">
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="" />
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="" />
              <div className="flex items-end space-x-1">
                <Input className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent" label="" placeholder="" />
                <div className="-translate-y-1 text-gray-300"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2 border-r-2 border-divider pr-8">
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <div className="font-medium"></div>
                <div className="cursor-pointer font-medium text-primary-600 underline"></div>
              </div>
              <div className="flex space-x-2">
                <div className="cursor-pointer font-medium text-primary-600 underline"></div>
                <div className="cursor-pointer text-gray-300 underline"></div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="" />
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="" />
              <Select className="flex-col !items-start" splitter={null} buttonClassName="w-32" label="" />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label=""
                placeholder="Type here"
              />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label=""
                placeholder="Type here"
              />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label=""
                placeholder="Type here"
              />
              <Input
                required
                className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent"
                label=""
                placeholder="Type here"
              />
              <Input className="h-9 w-32 border-gray-500 border-opacity-100 bg-transparent" label="" placeholder="" />
            </div>
          </div>
          <Button className="self-center"></Button>
        </div>
      </div>
      <div className="grid flex-grow grid-rows-2 gap-4 overflow-auto">
        <div className="row-span-1 flex space-x-8 overflow-auto rounded bg-primary-900 p-4 shadow">
          <div className="flex w-[40%] flex-col space-y-4">
            <div className="text-xl font-medium"></div>
          </div>
          <div className="flex w-[30%] flex-col">
            <div className="flex justify-between">
              <div></div>
              <div className="flex translate-y-8 -translate-x-12 space-x-4">
                <Legend label="" dotClassName="bg-_blue" />
                <Legend label="" dotClassName="bg-_orange" />
                <Legend label="" dotClassName="bg-_yellow" />
              </div>
            </div>
          </div>
          <div className="flex w-[30%] flex-col">
            <div></div>
          </div>
        </div>
        <div className="row-span-1 flex space-x-4 overflow-auto rounded bg-primary-900 p-4 shadow">
          <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium"></div>
          </div>
          <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium"></div>
          </div>
          <div className="flex w-[28%] flex-col space-y-4">
            <div className="flex justify-between">
              <div className="text-xl font-medium"></div>
              <div className="flex space-x-4">
                <Legend label="" dotClassName="bg-_blue" />
                <Legend label="" dotClassName="bg-_yellow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
