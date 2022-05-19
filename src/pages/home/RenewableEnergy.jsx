import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import { colors } from '../../styles';
import { ratioFormatter } from '../../utils/formatter';
import { getDecimalNumber } from '../../utils/number';

const DATA = {
  nonRenewableEnergy: { value: null, color: colors._blue, dotClassName: 'bg-_blue' },
  tRec: { value: null, color: colors.gray['100'], dotClassName: 'bg-unit' },
  selfConstructedSolarEnergy: {
    value: null,
    color: colors.primary['500'],
    dotClassName: 'bg-primary-500',
  },
};

const NAME_MAPPING = {
  nonRenewableEnergy: 'nonRenewableEnergy',
  tRec: 'tRec',
  selfConstructedSolarEnergy: 'solarPower',
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
});

export default function RenewableEnergy({ data = {} }) {
  const { t } = useTranslation(['homePage', 'common']);
  const nextData = useMemo(
    () => ({
      ...DATA,
      nonRenewableEnergy: { ...DATA.nonRenewableEnergy, value: data?.nonRenewableEnergy },
      selfConstructedSolarEnergy: {
        ...DATA.selfConstructedSolarEnergy,
        value: data?.selfConstructedSolarEnergy,
      },
      tRec: { ...DATA.tRec, value: data?.tRec },
    }),
    [data]
  );

  const option = useMemo(() => OPTION(nextData), [nextData]);
  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex h-full w-1/2 items-center justify-center">
        <Chart className="h-full w-full" option={option} />
        <div className="absolute text-center text-lg font-medium">
          <div className="text-_orange">{`Target : > ${getDecimalNumber(data?.target) || '-'}%`}</div>
          <div>{`Actual : ${ratioFormatter(1 - data.nonRenewableEnergy, { precision: 1 })}`}</div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-center space-y-4">
        {Object.entries(nextData).map(([name, { dotClassName, value }]) => (
          <Legend
            key={name}
            dotClassName={dotClassName}
            labelClassName="flex w-4/5 justify-between text-lg"
            label={
              <>
                <div>{t(`homePage:${NAME_MAPPING[name]}`)}</div>
                <div>{ratioFormatter(value, { precision: 1 })}</div>
              </>
            }
          />
        ))}
        <Legend
          labelClassName="flex w-4/5 justify-between text-lg"
          label={
            <>
              <div className="-translate-x-5">{t(`homePage:solarPowerTarget`)}</div>
              <div className="text-_orange">2%</div>
            </>
          }
        />
      </div>
    </div>
  );
}
