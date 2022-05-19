import { useMemo } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { baseFormatter } from '../../utils/formatter';

export default function OverviewNewMargin({ className, data = {} }) {
  const { t } = useTranslation(['homePage', 'common']);
  const nextData = useMemo(
    () => [
      {
        name: '營業額',
        title: t('revenue'),
        unit: `(${t('common:billionNtd')})`,
        value: data?.revenue?.currentYear,
      },
      {
        name: '用電量',
        title: t('electricityUsed'),
        unit: `(${t('common:mwh')})`,
        value: data?.electricPowerUtilization?.currentYear,
      },
      {
        name: '碳排量',
        title: t('carbonEmission'),
        unit: `(${t('common:metricTon')})`,
        value: data?.CO2Emission?.currentYear,
      },
      {
        name: '用水量',
        title: t('waterUsed'),
        unit: `(${t('common:thousandTon')})`,
        value: data?.waterUse?.currentYear,
      },
      {
        name: '廢棄物',
        title: t('wasteEmission'),
        unit: `(${t('common:metricTon')})`,
        value: data?.waste?.currentYear,
      },
    ],
    [data, t]
  );

  return (
    <div className={clsx('grid h-full w-full grid-cols-5 divide-x divide-divider', className)}>
      {nextData.map(({ title, unit, value, renderer = baseFormatter }) => {
        return (
          <div key={title} className="flex h-full flex-col justify-between px-4">
            <div className="flex items-baseline space-x-2">
              <div className="text-xl">{title}</div>
              <div className="text-unit">{unit}</div>
            </div>
            <div className="flex flex-grow items-center justify-center space-x-2">
              <div className="text-5xl font-bold">{renderer(value)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
