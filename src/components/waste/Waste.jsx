import Chart from '../../charts/Chart';
import colors from '../../styles/colors';

const OPTION = {
  xAxis: {
    type: 'category',
    data: ['2016', '2020', '2021'],
    axisTick: { show: false },
    axisLine: { lineStyle: { color: colors.primary['500'] } },
    axisLabel: { color: '#fff' },
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
  },
  series: [
    {
      data: [
        {
          value: 311265,
          itemStyle: { color: colors.yellow['500'], barBorderRadius: [4, 4, 0, 0] },
        },
        {
          value: 295172,
          itemStyle: { color: colors.blue['500'], barBorderRadius: [4, 4, 0, 0] },
        },
        {
          value: 78763,
          itemStyle: { color: colors.green['500'], barBorderRadius: [4, 4, 0, 0] },
        },
      ],
      type: 'bar',
      barWidth: '40%',
      label: { show: true, position: 'top', color: '#fff' },
      animationDuration: 2000,
    },
  ],
  grid: { top: 0, bottom: 24, left: 0, right: 0, containerLabel: true },
};

export default function Waste() {
  const option = {
    ...OPTION,
  };

  return (
    <div className="flex w-full h-full">
      <Chart className="w-1/2 h-full" option={option} />
      <div>123</div>
    </div>
  );
}
