import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { baseFormatter } from '../../utils/formatter';

export default function OverviewNewMargin({ className, data = {} }) {
  const { t } = useTranslation(['homePage', 'common']);
  const { revenue, electricPowerUtilization, CO2Emission, waterUse, waste } = data;
  const nextData = [
    {
      name: '營業額',
      title: t('revenue'),
      unit: `(${t('common:billionNtd')})`,
      value: revenue?.currentYear,
    },
    {
      name: '用電量',
      title: t('electricityUsed'),
      unit: `(${t('common:mwh')})`,
      value: electricPowerUtilization?.currentYear,
    },
    {
      name: '碳排量',
      title: t('carbonEmission'),
      unit: `(${t('common:metricTon')})`,
      value: CO2Emission?.currentYear,
    },
    {
      name: '用水量',
      title: t('waterUsed'),
      unit: `(${t('common:thousandTon')})`,
      value: waterUse?.currentYear,
    },
    {
      name: '廢棄物',
      title: t('wasteEmission'),
      unit: `(${t('common:metricTon')})`,
      value: waste?.currentYear,
    },
  ];

  return (
    <div className={clsx('grid h-full w-full divide-x divide-divider grid-cols-5', className)}>
      {nextData.map(({ title, unit, value, renderer = baseFormatter }) => {
        return (
          <div key={title} className="h-full px-4 flex flex-col justify-between">
            <div className="flex space-x-2 items-baseline">
              <div className="text-xl">{title}</div>
              <div className="text-unit">{unit}</div>
            </div>
            <div className="flex flex-grow items-center space-x-2 justify-center">
              <div className={`text-5xl font-bold `}>{renderer(value)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
