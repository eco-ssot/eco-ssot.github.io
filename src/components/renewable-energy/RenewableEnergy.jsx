import { merge } from 'lodash';

import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';
import { ratioFormatter } from '../../utils/formatter';
import { useGetRenewableEnergyApiQuery } from '../../services/renewableenergy';

const DATA = {
  不可再生能源: { value: null, color: colors.blue['500'], dotClassName: 'bg-blue-500' },
  自建太陽能: { value: null, color: colors.yellow['500'], dotClassName: 'bg-yellow-500' },
  電網包含: { value: null, color: colors.green['500'], dotClassName: 'bg-green-500' },
  綠證: { value: null, color: colors.gray['300'], dotClassName: 'bg-gray-500' },
};

const OPTION = (data = []) => ({
  tooltip: { show: false },
  legend: { show: false },
  series: [
    {
      type: 'pie',
      radius: ['70%', '90%'],
      avoidLabelOverlap: false,
      center: ['50%', '50%'],
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      data: Object.entries(data).map(([name, { color, value }]) => ({
        name,
        value,
        itemStyle: { color },
      })),
    },
  ],
  grid: { top: 16, bottom: 24, left: 16, right: 0, containerLabel: true },
});

export default function RenewableEnergy() {
  const { data = DATA } = useGetRenewableEnergyApiQuery();
  const { target, ...rest } = data;
  const nextData = merge(
    DATA,
    Object.entries(rest).reduce((prev, [key, value]) => ({ ...prev, [key]: { value } }), {})
  );

  const option = OPTION(nextData);
  return (
    <div className="flex w-full h-full items-center justify-between">
      <div className="w-1/2 h-full flex items-center justify-center">
        <Chart className="w-full h-full" option={option} />
        <div className="absolute text-center">
          <div>Target:</div>
          <div>{`可再生能源 > ${ratioFormatter(target)}`}</div>
        </div>
      </div>
      <div className="flex flex-col px-8 justify-center w-1/2 space-y-4">
        {Object.entries(nextData).map(([name, { dotClassName, value }]) => (
          <Legend
            key={name}
            dotClassName={dotClassName}
            labelClassName="flex w-4/5 justify-between"
            label={
              <>
                <div>{name}</div>
                <div>{ratioFormatter(value)}</div>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
}
