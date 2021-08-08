import Chart from '../../charts/Chart';
import colors from '../../styles/colors';
import Legend from '../legend/Legend';

const OPTION = {
  xAxis: {
    type: 'category',
    data: ['2018 Total', '2021 1-6月'],
    axisTick: { show: false },
    axisLine: { lineStyle: { color: colors.primary['500'] } },
    axisLabel: { color: '#fff' },
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLine: { show: false },
  },
  series: [
    {
      data: [
        {
          value: 51.43,
          itemStyle: { color: colors.yellow['500'], barBorderRadius: [4, 4, 0, 0] },
        },
        {
          value: 53.76,
          itemStyle: { color: colors.green['500'], barBorderRadius: [4, 4, 0, 0] },
        },
      ],
      type: 'bar',
      barWidth: 32,
      label: { show: true, position: 'top', color: '#fff' },
      animationDuration: 2000,
      markLine: {
        data: [{ yAxis: 50.4 }],
        symbol: 'none',
        lineStyle: { color: colors.orange['500'] },
      },
    },
  ],
  grid: { top: 16, bottom: 24, left: 16, right: 32, containerLabel: true },
};

export default function Waste() {
  const option = {
    ...OPTION,
  };

  return (
    <div className="flex w-full h-full items-center justify-around">
      <Chart className="w-3/5 h-full" option={option} />
      <div className="flex flex-col h-full justify-center items-start space-y-4">
        <Legend dotClassName="bg-yellow-500" label="基準年" />
        <Legend dotClassName="bg-orange-500" label="Target : 對比基準年 -6%" />
        <div>單位：公噸/十億臺幣</div>
      </div>
    </div>
  );
}
