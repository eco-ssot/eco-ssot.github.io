import clsx from 'clsx';

import Arrow from '../arrow/Arrow';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';

const DATA = [
  {
    title: '營業額',
    unit: '(十億臺幣)',
    overall: 0.1,
    direction: 'up',
    color: 'text-green-500',
    data: [
      { key: 2020, value: 184946.89 },
      { key: 2021, value: 192366.36 },
    ],
  },
  {
    title: '用電量',
    unit: '(千度)',
    overall: 0.1,
    direction: 'down',
    color: 'text-green-500',
    data: [
      { key: 2020, value: 291374.76 },
      { key: 2021, value: 241087.51 },
    ],
  },
  {
    title: '碳排量',
    unit: '(公噸)',
    overall: 0.1,
    direction: 'up',
    color: 'text-red-500',
    data: [
      { key: 2020, value: 48719.01 },
      { key: 2021, value: 56837.51 },
    ],
  },
  {
    title: '用水量',
    unit: '(KM³)',
    overall: 0.1,
    direction: 'down',
    color: 'text-green-500',
    data: [
      { key: 2020, value: 43816.81 },
      { key: 2021, value: 39182.76 },
    ],
  },
  {
    title: '廢棄物',
    unit: '(公噸)',
    overall: 0.1,
    direction: 'down',
    color: 'text-green-500',
    data: [
      { key: '數位化', value: 917.19 },
      { key: '技改及管理', value: 803.77 },
    ],
  },
  {
    title: '總節電量',
    unit: '(千度)',
    overall: 11208,
    direction: null,
    color: null,
    data: [
      { key: '數位化', value: 7291 },
      { key: '技改及管理', value: 3917 },
    ],
    renderer: baseFormatter,
  },
];

export default function Overview({ className }) {
  return (
    <div className={clsx('grid h-full w-full divide-x divide-gray-500 grid-cols-6', className)}>
      {DATA.map(({ title, unit, overall, direction, color, data, renderer = ratioFormatter }) => {
        return (
          <div key={title} className="h-full px-4">
            <div className="flex h-1/6 space-x-2">
              <div>{title}</div>
              <div className="text-gray-300">{unit}</div>
            </div>
            <div className="flex h-2/5 items-center justify-center border-b border-primary-500">
              <Arrow className={`w-1/4 h-3/4 ${color}`} direction={direction} />
              <div className={`text-4xl font-bold ${color}`}>{renderer(overall)}</div>
            </div>
            <div className="space-y-2 py-2">
              {data.map(({ key, value, renderer = baseFormatter }) => {
                return (
                  <div className="flex justify-between w-full h-3/4 items-center px-4" key={key}>
                    <div className="text-gray-400">{key}</div>
                    <div className="text-2xl">{renderer(value)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
