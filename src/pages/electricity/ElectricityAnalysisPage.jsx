import AnalysisPage from '../analysis/AnalysisPage';
import { colors } from '../../styles';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';

const DATA = [
  {
    title: '用電量',
    unit: '(千度)',
    value: -0.24,
    subData: [
      { key: '2020 YTM', value: 5495965 },
      { key: '2021 YTM', value: 4533269 },
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
    title: '用電強度',
    unit: '(千度/十億臺幣)',
    value: 0.24,
    subData: [
      { key: '2020 YTM', value: 457997 },
      { key: '2021 YTM', value: 566569 },
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
    description: 'YTM ASP 降低18%，影響2021 營收13.9億、用電強度16%',
    strategy: '改善措施',
    expectation: '每月減少 500度用電',
    contribution: '用電強度 -3%',
    dueDate: '2021.09.21',
    finishDate: '--',
    pic: '王一二',
  },
  {
    description: '15台除濕機設定管控、PCBA直流電源Study休息時間',
    strategy: '改善措施',
    expectation: '每月減少 1000度用電',
    contribution: '用電強度 -7%',
    dueDate: '2021.09.23',
    finishDate: '2021.09.11',
    pic: '王一二',
  },
  {
    description: '氮氣櫃優化，取消 Reflow MG 供氮裝置',
    strategy: '改善措施',
    expectation: '每年減少 1500度用電',
    contribution: '用電強度 -10%',
    dueDate: '2021.09.30',
    finishDate: '2021.09.13',
    pic: '王一二',
  },
  {
    description: 'Weekly review 夏季用電節省方案',
    strategy: '改善措施',
    expectation: '每月減少 700度用電',
    contribution: '用電強度 -5%',
    dueDate: '2021.10.01',
    finishDate: '--',
    pic: '王一二',
  },
];

const LABELS = ['2020 Actual', '2021 Actual', '2021 還原ASP影響'];
const VALUES = [457997, 566659, 404756];
const TARGET = 448837;
const COLORS = [colors._yellow, colors.primary['600'], colors.primary['500']];

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
  const [base, curr, asp] = values;
  const currTrend = getMarkLineTrend(curr, base, '60%');
  const aspTrend = getMarkLineTrend(asp, base, '85%');
  const markLines = values.map((val, i) => {
    const style = {
      lineStyle: { color: COLORS[i] },
      label: { show: false },
    };

    if (i === 0) {
      return { yAxis: val, ...style };
    }

    if (i === 1) {
      return [
        { yAxis: val, x: '40%', ...style },
        { yAxis: val, x: '60%', val },
      ];
    }

    return [
      { yAxis: val, x: '65%', ...style },
      { yAxis: val, x: '85%', val },
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
          data: [...markLines, currTrend, aspTrend].concat(
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
    grid: { left: 64, right: 64, top: 64, bottom: 0, containLabel: true },
  };
};

export default function ElectricityAnalysisPage() {
  const option = OPTION();
  return (
    <AnalysisPage
      title="十億營業額用電：用電強度分析"
      chartTitle="用電強度對比"
      overview={DATA}
      chartOption={option}
      tableData={TABLE_DATA}
      target="對比基準年 -2 %"
    />
  );
}
