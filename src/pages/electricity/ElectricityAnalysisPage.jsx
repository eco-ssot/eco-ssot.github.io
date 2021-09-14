import { useSelector } from 'react-redux';

import AnalysisPage from '../analysis/AnalysisPage';
import { colors } from '../../styles';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';
import { useGetElectricityAnalysisQuery } from '../../services/electricity';
import { selectBusiness, selectSite, selectPlant } from '../../renderless/location/locationSlice';
import useGoal from '../../hooks/useGoal';

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

const OPTION = (values, labels, target) => {
  const [base, curr, asp] = values;
  const currTrend = getMarkLineTrend(curr, base, '60%');
  const aspTrend = getMarkLineTrend(asp, base, '85%');
  const markLines = values.map((val, i) => {
    const style = {
      lineStyle: { color: COLORS[i] },
      label: { show: false },
    };

    return { yAxis: val, ...style };
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
    grid: { left: 72, right: 72, top: 64, bottom: 0, containLabel: true },
  };
};

export default function ElectricityAnalysisPage() {
  const business = useSelector(selectBusiness);
  const site = useSelector(selectSite);
  const plant = useSelector(selectPlant);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '用電強度' });
  const { data } = useGetElectricityAnalysisQuery({ business, site, plant });
  const { ASP, electrcity, electrcityIntensity, revenue, shipment } = data || {};
  const currYearKey = `${currYear} YTM`;
  const lastYearKey = `${baseYear} YTM`;
  const overview = [
    {
      title: '用電量',
      unit: '(度)',
      value: electrcity?.gradient,
      subData: [
        { key: lastYearKey, value: electrcity?.compareYear },
        { key: currYearKey, value: electrcity?.currentYear },
      ],
    },
    {
      title: '營業額',
      unit: '(十億台幣)',
      value: revenue?.gradient,
      subData: [
        { key: lastYearKey, value: revenue?.compareYear },
        { key: currYearKey, value: revenue?.currentYear },
      ],
    },
    {
      title: '用電強度',
      unit: '(度/十億臺幣)',
      value: electrcityIntensity?.gradient,
      subData: [
        { key: lastYearKey, value: electrcityIntensity?.compareYear },
        { key: currYearKey, value: electrcityIntensity?.currentYear },
      ],
    },
    {
      title: '出貨量',
      unit: '(千片)',
      value: shipment?.gradient,
      subData: [
        { key: lastYearKey, value: shipment?.compareYear },
        { key: currYearKey, value: shipment?.currentYear },
      ],
    },
    {
      title: 'ASP',
      unit: '(千臺幣/片)',
      value: ASP?.gradient,
      subData: [
        {
          key: lastYearKey,
          value: ASP?.compareYear,
          renderer: (value) => baseFormatter(value, { precision: 2 }),
        },
        {
          key: currYearKey,
          value: ASP?.currentYear,
          renderer: (value) => baseFormatter(value, { precision: 2 }),
        },
      ],
    },
  ];

  const values = [electrcityIntensity?.compareYear, electrcityIntensity?.currentYear, electrcityIntensity?.ASP];
  const labels = [`${baseYear} Actual`, `${currYear} Actual`, `${currYear} 還原ASP影響`];
  const target = electrcityIntensity?.compareYear * (1 - pct);
  const option = OPTION(values, labels, target);
  return (
    <AnalysisPage
      title={`十億營業額用電：用電強度分析 ${plant ? `(Plant: ${plant})` : site ? `(Site: ${site})` : ''}`}
      chartTitle="用電強度對比"
      target={label}
      overview={overview}
      tableData={TABLE_DATA}
      {...(data && { chartOption: option })}
    />
  );
}
