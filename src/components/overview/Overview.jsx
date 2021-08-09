import clsx from 'clsx';

import Arrow from '../arrow/Arrow';

const DATA = [
  {
    title: '用電量',
    unit: '(度)',
    overall: '10%',
    direction: 'down',
    color: 'text-green-500',
    data: [
      { key: 2020, value: 100 },
      { key: 2021, value: 90 },
    ],
  },
  {
    title: '營業額',
    unit: '(十億臺幣)',
    overall: '10%',
    direction: 'down',
    color: 'text-green-500',
    data: [
      { key: 2020, value: 100 },
      { key: 2021, value: 90 },
    ],
  },
  {
    title: '用水量',
    unit: '(M³)',
    overall: '10%',
    direction: 'up',
    color: 'text-red-500',
    data: [
      { key: 2020, value: 90 },
      { key: 2021, value: 100 },
    ],
  },
  {
    title: '太陽能發電量',
    unit: '(度)',
    overall: '10%',
    direction: 'up',
    color: 'text-green-500',
    data: [
      { key: 2020, value: 100 },
      { key: 2021, value: 90 },
    ],
  },
  {
    title: '總節電量',
    unit: '(度)',
    overall: '210',
    direction: null,
    color: null,
    data: [
      { key: '數位化', value: 100 },
      { key: '技改及管理', value: 110 },
    ],
  },
];

export default function Overview({ className }) {
  return (
    <div className={clsx('grid grid-cols-5 h-full w-full divide-x divide-gray-500', className)}>
      {DATA.map(({ title, unit, overall, direction, color, data }) => {
        return (
          <div key={title} className="h-full px-4">
            <div className="h-1/6">
              {title} {unit}
            </div>
            <div className="flex h-1/2 items-center justify-center">
              <Arrow className={`w-1/4 h-3/4 ${color}`} direction={direction} />
              <div className={`text-4xl ${color}`}>{overall}</div>
            </div>
            <div
              className={`grid items-center h-1/4 ring-1 ring-primary-500 rounded px-4 divide-x divide-primary-500 grid-cols-2`}>
              {data.map(({ key, value }) => {
                return (
                  <div className="flex justify-around w-full h-3/4 items-center" key={key}>
                    <div className="text-gray-400">{key}</div>
                    <div className="text-2xl">{value}</div>
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
