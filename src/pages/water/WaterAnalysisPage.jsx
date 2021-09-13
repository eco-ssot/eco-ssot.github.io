import AnalysisPage from '../analysis/AnalysisPage';
import { colors } from '../../styles';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';

const DATA = [
  {
    title: '用水量',
    unit: '(公噸)',
    value: -0.24,
    subData: [
      { key: '2020 YTM', value: 63500 },
      { key: '2021 YTM', value: 51261 },
    ],
  },
  {
    title: '營業額',
    unit: '(十億台幣)',
    value: -0.33,
    subData: [
      { key: '2020 YTM', value: 12 },
      { key: '2021 YTM', value: 8 },
    ],
  },
  {
    title: '用水強度',
    unit: '(公噸/十億臺幣)',
    value: 0.19,
    subData: [
      { key: '2020 YTM', value: 5375 },
      { key: '2021 YTM', value: 6408 },
    ],
  },
  {
    title: '出貨量',
    unit: '(千片)',
    value: -0.13,
    subData: [
      { key: '2020 YTM', value: 1353 },
      { key: '2021 YTM', value: 1183 },
    ],
  },
  {
    title: 'ASP',
    unit: '(千臺幣/片)',
    value: -0.18,
    subData: [
      { key: '2020 YTM', value: 8.06, renderer: (value) => baseFormatter(value, { precision: 2 }) },
      { key: '2021 YTM', value: 6.56, renderer: (value) => baseFormatter(value, { precision: 2 }) },
    ],
  },
];

const TABLE_DATA = [
  {
    description: 'YTM ASP 降低18%，影響2021營收13.9億、用水強度16%',
    strategy: '改善措施',
    expectation: '每月減少 500度用電',
    contribution: '用電強度 -3%',
    dueDate: '2021.09.21',
    finishDate: '--',
    pic: '王一二',
  },
  {
    description: '15台除濕機設定管控',
    strategy: '改善措施',
    expectation: '每月減少 500噸用水',
    contribution: '用水強度 -3%',
    dueDate: '2021.09.23',
    finishDate: '2021.09.11',
    pic: '王一二',
  },
  {
    description: '氮氣櫃優化，取消 Reflow MG 供氮裝置',
    strategy: '改善措施',
    expectation: '每月減少 500噸用水',
    contribution: '用水強度 -7%',
    dueDate: '2021.09.30',
    finishDate: '2021.09.13',
    pic: '王一二',
  },
];

const LABELS = ['2016 Baseline', '2020 Actual', '2021 Actual', '2021 還原ASP影響'];
const VALUES = [5705, 5375, 6408, 4760];
const TARGET = 5192;
const COLORS = [colors._yellow, colors._blue, colors.primary['600'], colors.primary['500']];

export function getMarkLineTrend(value, comparison, x) {
  const isBetter = value - comparison < 0;
  const style = {
    symbol: 'triangle',
    symbolSize: [12, 8],
    lineStyle: {
      color: isBetter ? colors.green['500'] : colors.dangerous['700'],
      type: 'solid',
      width: 4,
      emphasis: { width: 4 },
    },
    label: {
      show: true,
      position: 'middle',
      fontWeight: 'bold',
    },
  };

  const ret = [
    { x, yAxis: value, ...style },
    { x, yAxis: comparison, name: ratioFormatter(value / comparison - 1) },
  ];

  if (isBetter) {
    ret.reverse();
  }

  return ret;
}

const OPTION = (values = VALUES, labels = LABELS, target = TARGET) => {
  const [base, prev, curr, asp] = values;
  const currTrend = getMarkLineTrend(curr, base, '70%');
  const aspTrend = getMarkLineTrend(asp, base, '90%');
  const prevTrend = getMarkLineTrend(asp, prev, '85%');
  const markLines = values.map((val, i) => {
    const style = {
      lineStyle: { color: COLORS[i] },
      label: { show: false },
    };

    if (i < 2) {
      return { yAxis: val, ...style };
    }

    if (i === 2) {
      return [
        { yAxis: val, x: '50%', ...style },
        { yAxis: val, x: '70%', val },
      ];
    }

    return [
      { yAxis: val, x: '70%', ...style },
      { yAxis: val, x: '90%', val },
    ];
  });

  return {
    xAxis: {
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.primary['600'] } },
      axisLabel: {
        color: colors.gray['50'],
        formatter: (value) => value.split(' ').join('\n'),
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      scale: true,
    },
    series: [
      {
        data: values.map((value, i) => ({
          value,
          itemStyle: { color: COLORS[i], barBorderRadius: [4, 4, 0, 0] },
        })),
        type: 'bar',
        barWidth: 48,
        label: { show: true, position: 'top', color: colors.gray['50'], formatter: baseFormatter },
        animationDuration: 2000,
        markLine: {
          symbol: 'none',
          data: [...markLines, currTrend, prevTrend, aspTrend].concat(
            target
              ? [
                  {
                    yAxis: target,
                    lineStyle: { color: colors._orange },
                    label: { formatter: baseFormatter, position: 'start' },
                  },
                ]
              : []
          ),
        },
      },
    ],
    grid: { left: 48, right: 48, top: 64, bottom: 0, containLabel: true },
  };
};

export default function WaterAnalysisPage() {
  const option = OPTION();
  return (
    <AnalysisPage
      title="十億營業額用水：用水強度分析"
      chartTitle="用水強度對比"
      overview={DATA}
      chartOption={option}
      tableData={TABLE_DATA}
      target="對比基準年 -9 %"
    />
  );
}
