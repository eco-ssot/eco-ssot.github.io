import { isNil } from 'lodash';
import { useSelector } from 'react-redux';

import useGoal from '../../hooks/useGoal';
import { selectBusiness, selectPlant, selectSite } from '../../renderless/location/locationSlice';
import {
  useDeleteWasteExplanationMutation,
  useDeleteWasteImprovementMutation,
  useGetWasteAnalysisQuery,
  useGetWasteExplanationQuery,
  usePatchWasteExplanationMutation,
  usePatchWasteImprovementMutation,
  usePostWasteExplanationMutation,
  usePostWasteImprovementMutation,
} from '../../services/waste';
import { colors } from '../../styles';
import { ratioFormatter, baseFormatter } from '../../utils/formatter';
import AnalysisPage from '../analysis/AnalysisPage';

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
    { x, yAxis: comparison, name: ratioFormatter(value / comparison - 1, { precision: 2 }) },
  ];

  if (isBetter) {
    ret.reverse();
  }

  return ret;
}

const OPTION = (values, labels, target) => {
  const [base, , curr, asp] = values;
  const currTrend = getMarkLineTrend(curr, base, '66.5%');
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
        label: {
          show: true,
          position: 'top',
          color: colors.gray['50'],
          formatter: ({ value }) => baseFormatter(value, { precision: 2 }),
        },
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
                      name: baseFormatter(target, { precision: 2 }),
                      label: { position: 'insideStartBottom' },
                    },
                    { x: '100%', yAxis: target },
                  ],
                ]
              : []
          ),
        },
      },
    ],
    grid: { left: 64, right: 64, top: 64, bottom: 0, containLabel: true },
  };
};

export default function WasteAnalysisPage() {
  const business = useSelector(selectBusiness);
  const site = useSelector(selectSite);
  const plant = useSelector(selectPlant);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '廢棄物密度' });
  const { data } = useGetWasteAnalysisQuery({ business, site, plant });
  const { data: tableData } = useGetWasteExplanationQuery({ business, site, plant });
  const [postExplanation] = usePostWasteExplanationMutation();
  const [postImprovement] = usePostWasteImprovementMutation();
  const [patchExplanation] = usePatchWasteExplanationMutation();
  const [patchImprovement] = usePatchWasteImprovementMutation();
  const [deleteExplanation] = useDeleteWasteExplanationMutation();
  const [deleteImprovement] = useDeleteWasteImprovementMutation();
  const { ASP, waste, wasteIntensity, revenue, shipment } = data || {};
  const lastYear = currYear - 1;
  const currYearKey = `${currYear} YTM`;
  const lastYearKey = `${lastYear} YTM`;
  const overview = [
    {
      title: '廢棄物總量',
      unit: '(公噸)',
      value: waste?.gradient,
      subData: [
        { key: lastYearKey, value: waste?.baseYear, renderer: (value) => baseFormatter(value, { precision: 2 }) },
        { key: currYearKey, value: waste?.currentYear, renderer: (value) => baseFormatter(value, { precision: 2 }) },
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
      title: '廢棄物產生密度',
      unit: '(公噸/十億臺幣)',
      value: wasteIntensity?.currentAndCompareGradient,
      subData: [
        {
          key: lastYearKey,
          value: wasteIntensity?.compareYear,
          renderer: (value) => baseFormatter(value, { precision: 2 }),
        },
        {
          key: currYearKey,
          value: wasteIntensity?.currentYear,
          renderer: (value) => baseFormatter(value, { precision: 2 }),
        },
      ],
      renderer: (value) => ratioFormatter(value, { precision: 2 }),
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

  const values = [
    wasteIntensity?.baseYear,
    wasteIntensity?.compareYear,
    wasteIntensity?.currentYear,
    wasteIntensity?.ASP,
  ];

  const labels = [`${baseYear} Actual`, `${lastYear} Actual`, `${currYear} Actual`, `${currYear} 還原ASP影響`];
  const target = wasteIntensity?.baseYear * (1 - pct);
  const option = OPTION(values, labels, target);
  return (
    <AnalysisPage
      title={`廢棄物產生密度：廢棄物密度分析 ${`(Plant: ${plant || site || '-'})`}`}
      chartTitle="廢棄物密度對比"
      tableTitle="影響廢棄物密度"
      overview={overview}
      tableData={tableData?.data}
      target={label}
      chartOption={option}
      onRowChange={({ id, data }) =>
        isNil(id) ? postExplanation({ data: { ...data, site, plant, bo: business } }) : patchExplanation({ id, data })
      }
      onSubRowChange={({ id, subId, data }) =>
        isNil(subId) ? postImprovement({ id, data }) : patchImprovement({ id, subId, data })
      }
      onDeleteRow={({ id }) => deleteExplanation({ id })}
      onDeleteSubRow={({ id, subId }) => deleteImprovement({ id, subId })}
    />
  );
}
