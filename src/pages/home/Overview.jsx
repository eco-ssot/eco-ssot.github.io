import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import Arrow from '../../components/arrow/Arrow';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';
import { getTrend } from '../../utils/trend';

export default function Overview({ className, compareYear, currentYear, data = {} }) {
  const { t } = useTranslation(['homePage', 'common']);
  const { revenue, electricPowerUtilization, CO2Emission, waterUse, waste } = data;
  const nextData = [
    {
      name: '營業額',
      title: t('revenue'),
      unit: `(${t('common:billionNtd')})`,
      value: revenue?.gradient,
      subData: [
        { key: compareYear, value: revenue?.compareYear },
        { key: currentYear, value: revenue?.currentYear },
      ],
    },
    {
      name: '用電量',
      title: t('electricityUsed'),
      unit: `(${t('common:mwh')})`,
      value: electricPowerUtilization?.gradient,
      subData: [
        { key: compareYear, value: electricPowerUtilization?.compareYear },
        { key: currentYear, value: electricPowerUtilization?.currentYear },
      ],
    },
    {
      name: '碳排量',
      title: t('carbonEmission'),
      unit: `(${t('common:metricTon')})`,
      value: CO2Emission?.gradient,
      subData: [
        { key: compareYear, value: CO2Emission?.compareYear },
        { key: currentYear, value: CO2Emission?.currentYear },
      ],
    },
    {
      name: '用水量',
      title: t('waterUsed'),
      unit: `(${t('common:thousandTon')})`,
      value: waterUse?.gradient,
      subData: [
        { key: compareYear, value: waterUse?.compareYear },
        { key: currentYear, value: waterUse?.currentYear },
      ],
    },
    {
      name: '廢棄物',
      title: t('wasteEmission'),
      unit: `(${t('common:metricTon')})`,
      value: waste?.gradient,
      subData: [
        { key: compareYear, value: waste?.compareYear },
        { key: currentYear, value: waste?.currentYear },
      ],
    },
    // {
    //   name: '總節電量',
    //   title: t('electricitySaving'),
    //   unit: `(${t('common:mwh')})`,
    //   value: totalPowerSaving?.amount,
    //   subData: [
    //     { key: t('digitization'), value: totalPowerSaving?.digital },
    //     { key: t('technologyImprovementAndManagement'), value: totalPowerSaving?.manage },
    //   ],
    //   renderer: baseFormatter,
    // },
  ];

  return (
    <div className={clsx('grid h-full w-full grid-cols-5 divide-x divide-divider', className)}>
      {nextData.map(({ title, unit, value, name, subData = [], renderer = ratioFormatter }) => {
        const trend = getTrend(value, name);
        return (
          <div key={title} className="flex h-full flex-col justify-between px-4">
            <div className="flex items-baseline space-x-2">
              <div className="text-xl">{title}</div>
              <div className="text-unit">{unit}</div>
            </div>
            <div className="flex h-1/2 items-center justify-center space-x-2 border-b border-primary-600">
              <Arrow className={`h-14 w-14 ${trend.color}`} direction={trend.direction} />
              <div className={`text-4xl font-bold ${trend.color}`}>{renderer(trend.value)}</div>
            </div>
            <div className="space-y-2 py-2">
              {subData.map(({ key, value: _value, renderer: _renderer = baseFormatter }, i) => {
                return (
                  <div className="flex w-full items-center justify-between px-4" key={i}>
                    <div className="text-unit">{key}</div>
                    <div className="text-2xl font-medium">{_renderer(_value)}</div>
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
