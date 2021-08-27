import clsx from 'clsx';

import Arrow from '../../components/arrow/Arrow';
import { baseFormatter, ratioFormatter } from '../../utils/formatter';

function getTrend(gradient, title) {
  if (gradient === undefined) {
    return { overall: gradient };
  }

  const overall = Math.abs(gradient);
  switch (title) {
    case '營業額': {
      if (gradient > 0) {
        return { overall, direction: 'up', color: 'text-primary-500' };
      }

      return { overall, direction: 'down', color: 'text-_red' };
    }

    case '用電量':
    case '用水量':
    case '廢棄物':
    case '碳排量': {
      if (gradient > 0) {
        return { overall, direction: 'up', color: 'text-_red' };
      }

      return { overall, direction: 'down', color: 'text-primary-500' };
    }

    default:
      return { overall: gradient };
  }
}

export default function Overview({ className, compareYear, currentYear, data = {} }) {
  const { revenue, electricPowerUtilization, CO2Emission, waterUse, waste, totalPowerSaving } = data;

  const nextData = [
    {
      title: '營業額',
      unit: '(十億台幣)',
      gradient: revenue?.gradient,
      subData: [
        { key: compareYear, value: revenue?.compareYear },
        { key: currentYear, value: revenue?.currentYear },
      ],
    },
    {
      title: '用電量',
      unit: '(千度)',
      gradient: electricPowerUtilization?.gradient,
      subData: [
        { key: compareYear, value: electricPowerUtilization?.compareYear },
        { key: currentYear, value: electricPowerUtilization?.currentYear },
      ],
    },
    {
      title: '碳排量',
      unit: '(公噸)',
      gradient: CO2Emission?.gradient,
      subData: [
        { key: compareYear, value: CO2Emission?.compareYear },
        { key: currentYear, value: CO2Emission?.currentYear },
      ],
    },
    {
      title: '用水量',
      unit: '(千噸)',
      gradient: waterUse?.gradient,
      subData: [
        { key: compareYear, value: waterUse?.compareYear },
        { key: currentYear, value: waterUse?.currentYear },
      ],
    },
    {
      title: '廢棄物',
      unit: '(公噸)',
      gradient: waste?.gradient,
      subData: [
        { key: compareYear, value: waste?.compareYear },
        { key: currentYear, value: waste?.currentYear },
      ],
    },
    {
      title: '總節電量',
      unit: '(千度)',
      gradient: totalPowerSaving?.amount,
      subData: [
        { key: '數位化', value: totalPowerSaving?.digital },
        { key: '技改及管理', value: totalPowerSaving?.manage },
      ],
      renderer: baseFormatter,
    },
  ];

  return (
    <div className={clsx('grid h-full w-full divide-x divide-divider grid-cols-6', className)}>
      {nextData.map(({ title, unit, gradient, subData = [], renderer = ratioFormatter }) => {
        const { overall, color, direction } = getTrend(gradient, title);
        return (
          <div key={title} className="h-full px-4 flex flex-col justify-between">
            <div className="flex space-x-2 items-baseline">
              <div className="text-xl">{title}</div>
              <div className="text-unit">{unit}</div>
            </div>
            <div className="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600">
              <Arrow className={`w-14 h-14 ${color}`} direction={direction} />
              <div className={`text-4xl font-bold ${color}`}>{renderer(overall)}</div>
            </div>
            <div className="space-y-2 py-2">
              {subData.map(({ key, value, renderer = baseFormatter }) => {
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
      })}
    </div>
  );
}
