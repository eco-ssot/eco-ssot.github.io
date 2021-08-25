import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../../components/legend/Legend';
import { ratioFormatter } from '../../utils/formatter';

const DATA = {
  nonRenewableEnergy: { value: null, color: colors._blue, dotClassName: 'bg-_blue' },
  selfConstructedSolarEnergy: {
    value: null,
    color: colors.primary['500'],
    dotClassName: 'bg-primary-500',
  },
  tRec: { value: null, color: colors.divider, dotClassName: 'bg-unit' },
};

const NAME_MAPPING = {
  nonRenewableEnergy: '不可再生能源',
  selfConstructedSolarEnergy: '自建太陽能',
  tRec: '綠證',
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
        value,
        name: NAME_MAPPING[name] || name,
        itemStyle: { color },
      })),
    },
  ],
  grid: { top: 16, bottom: 24, left: 16, right: 0, containerLabel: true },
});

export default function RenewableEnergy({ data = {} }) {
  const { nonRenewableEnergy, selfConstructedSolarEnergy, tRec, target = '' } = data;
  const nextData = {
    ...DATA,
    nonRenewableEnergy: { ...DATA.nonRenewableEnergy, value: nonRenewableEnergy },
    selfConstructedSolarEnergy: {
      ...DATA.selfConstructedSolarEnergy,
      value: selfConstructedSolarEnergy,
    },
    tRec: { ...DATA.tRec, value: tRec },
  };

  const option = OPTION(nextData);
  return (
    <div className="flex w-full h-full items-center justify-between">
      <div className="w-1/2 h-full flex items-center justify-center">
        <Chart className="w-full h-full" option={option} />
        <div className="absolute text-center space-y-2">
          <div className="text-_orange">{`Target : > ${target.replace(/[^0-9]/g, '') || '-'}%`}</div>
          <div>{`Actual : ${ratioFormatter(1 - data.nonRenewableEnergy, { precision: 1 })}`}</div>
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
                <div>{NAME_MAPPING[name] || name}</div>
                <div>{ratioFormatter(value, { precision: 1 })}</div>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
}
