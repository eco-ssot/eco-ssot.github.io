import clsx from 'clsx';

import Arrow from '../arrow/Arrow';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';
import { useGetOverallApiQuery } from '../../services/overall';

const DATA = [
  {
    title: '營業額',
    unit: '(十億臺幣)',
  },
  {
    title: '用電量',
    unit: '(千度)',
  },
  {
    title: '碳排量',
    unit: '(公噸)',
  },
  {
    title: '用水量',
    unit: '(KM³)',
  },
  {
    title: '廢棄物',
    unit: '(公噸)',
  },
  {
    title: '總節電量',
    unit: '(千度)',
  },
];

export default function Overview({ className }) {
  const { data = DATA } = useGetOverallApiQuery();
  return (
    <div className={clsx('grid h-full w-full divide-x divide-divider grid-cols-6', className)}>
      {data.map(
        ({ title, unit, overall, direction, color, data = [], renderer = ratioFormatter }) => {
          return (
            <div key={title} className="h-full px-4 flex flex-col justify-between">
              <div className="flex space-x-2">
                <div>{title}</div>
                <div className="text-unit">{unit}</div>
              </div>
              <div className="h-1/2 flex items-center justify-center border-b border-primary-600">
                <Arrow className={`w-1/4 ${color}`} direction={direction} />
                <div className={`text-4xl font-bold ${color}`}>{renderer(overall)}</div>
              </div>
              <div className="space-y-2 py-2">
                {data.map(({ key, value, renderer = baseFormatter }) => {
                  return (
                    <div className="flex justify-between w-full items-center px-4" key={key}>
                      <div className="text-unit">{key}</div>
                      <div className="text-2xl font-medium">{renderer(value)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
