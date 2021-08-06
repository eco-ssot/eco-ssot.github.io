import clsx from 'clsx';

import ArrowDown from '../arrow-down/ArrowDown';
import ArrowUp from '../arrow-up/ArrowUp';
import Divider from '../divider/Divider';

const DATA = [
  {
    title: '用電量',
    unit: '(度)',
    overall: '10%',
    direction: 'down',
    color: 'green',
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
    color: 'green',
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
    color: 'red',
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
    color: 'green',
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

export function Arrow({ direction, color }) {
  return direction ? (
    direction === 'up' ? (
      <ArrowUp className={`transform rotate-45 h-3/5 w-1/4 text-${color}-500`} />
    ) : (
      <ArrowDown className={`transform -rotate-45 h-3/5 w-1/4 text-${color}-500`} />
    )
  ) : null;
}

export default function Overview({ className, ...props }) {
  return (
    <div className={clsx('grid grid-flow-col gap-4 h-full', className)} {...props}>
      {DATA.map(({ title, unit, overall, direction, color, data }, i) => {
        return (
          <div
            key={title}
            className={clsx('h-full', {
              'border-0 border-r border-solid border-divider': i < DATA.length - 1,
            })}>
            <div className="h-1/4">
              {title} {unit}
            </div>
            <div className="flex h-1/2 items-center justify-center">
              <Arrow direction={direction} color={color} />
              <div className="text-4xl">{overall}</div>
            </div>
            <div className="h-1/4">
              {data.map(({ key, value }) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
