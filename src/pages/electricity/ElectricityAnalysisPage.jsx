import { isNil } from 'lodash';
import { useSelector } from 'react-redux';

import useGoal from '../../hooks/useGoal';
import { selectBusiness, selectSite, selectPlant } from '../../renderless/location/locationSlice';
import {
  useGetElectricityAnalysisQuery,
  useGetElectricityExplanationQuery,
  usePatchElectricityExplanationMutation,
  usePatchElectricityImprovementMutation,
  usePostElectricityExplanationMutation,
  usePostElectricityImprovementMutation,
} from '../../services/electricity';
import { colors } from '../../styles';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';
import AnalysisPage from '../analysis/AnalysisPage';

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

    return [
      { x: '0%', yAxis: val || 0, ...style },
      { x: '100%', yAxis: val || 0 },
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
                  [
                    {
                      x: '0%',
                      yAxis: target,
                      lineStyle: { color: colors._orange },
                      name: baseFormatter(target),
                      label: { position: 'insideStartBottom' },
                    },
                    {
                      x: '100%',
                      yAxis: target,
                    },
                  ],
                ]
              : []
          ),
        },
      },
    ],
    grid: { left: 64, right: 72, top: 64, bottom: 0, containLabel: true },
  };
};

export default function ElectricityAnalysisPage() {
  const business = useSelector(selectBusiness);
  const site = useSelector(selectSite);
  const plant = useSelector(selectPlant);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '用電強度' });
  const { data } = useGetElectricityAnalysisQuery({ business, site, plant });
  const { data: tableData } = useGetElectricityExplanationQuery({ business, site, plant });
  const [postExplanation] = usePostElectricityExplanationMutation();
  const [postImprovement] = usePostElectricityImprovementMutation();
  const [patchExplanation] = usePatchElectricityExplanationMutation();
  const [patchImprovement] = usePatchElectricityImprovementMutation();
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
      title={`十億營業額用電：用電強度分析 ${`(Plant: ${plant || site || '-'})`}`}
      chartTitle="用電強度對比"
      target={label}
      overview={overview}
      tableData={tableData?.data}
      onRowChange={({ id, data }) =>
        isNil(id) ? postExplanation({ data: { ...data, site, plant, bo: business } }) : patchExplanation({ id, data })
      }
      onSubRowChange={({ id, subId, data }) =>
        isNil(subId) ? postImprovement({ id, data }) : patchImprovement({ id, subId, data })
      }
      chartOption={option}
    />
  );
}
