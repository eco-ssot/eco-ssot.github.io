import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useGoal from '../../hooks/useGoal';
import { selectBusiness, selectM, selectPlant, selectSite, selectY } from '../../renderless/location/locationSlice';
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
import { ratioFormatter, baseFormatter, statisticsFormatter } from '../../utils/formatter';
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
    },
    emphasis: { lineStyle: { width: 4 } },
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
        formatter: (value) => value.replace(' ', '\n'),
        interval: 0,
        lineHeight: 16,
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
          itemStyle: { color: COLORS[i], borderRadius: [4, 4, 0, 0] },
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
  const { t } = useTranslation(['analysisPage']);
  const business = useSelector(selectBusiness);
  const site = useSelector(selectSite);
  const plant = useSelector(selectPlant);
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '廢棄物密度', labelType: 'analysis' });
  const { data } = useGetWasteAnalysisQuery({ business, site, plant, year: y, month: m });
  const { data: tableData } = useGetWasteExplanationQuery({ business, site, plant, year: y });
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
      name: '廢棄物總量',
      title: t('analysisPage:waste.waste.title'),
      unit: t('analysisPage:waste.waste.unit'),
      value: waste?.gradient,
      subData: [
        { key: lastYearKey, value: waste?.baseYear, renderer: statisticsFormatter },
        { key: currYearKey, value: waste?.currentYear, renderer: statisticsFormatter },
      ],
    },
    {
      name: '營業額',
      title: t('analysisPage:waste.revenue.title'),
      unit: t('analysisPage:waste.revenue.unit'),
      value: revenue?.gradient,
      subData: [
        { key: lastYearKey, value: revenue?.compareYear, renderer: statisticsFormatter },
        { key: currYearKey, value: revenue?.currentYear, renderer: statisticsFormatter },
      ],
    },
    {
      name: '廢棄物產生密度',
      title: t('analysisPage:waste.wasteDensity.title'),
      unit: t('analysisPage:waste.wasteDensity.unit'),
      value: wasteIntensity?.currentAndCompareGradient,
      subData: [
        {
          key: lastYearKey,
          value: wasteIntensity?.compareYear,
          renderer: statisticsFormatter,
        },
        {
          key: currYearKey,
          value: wasteIntensity?.currentYear,
          renderer: statisticsFormatter,
        },
      ],
      renderer: statisticsFormatter,
    },
    {
      name: '出貨量',
      title: t('analysisPage:waste.shipment.title'),
      unit: t('analysisPage:waste.shipment.unit'),
      value: shipment?.gradient,
      subData: [
        { key: lastYearKey, value: shipment?.compareYear },
        { key: currYearKey, value: shipment?.currentYear },
      ],
    },
    {
      name: 'ASP',
      title: 'ASP',
      unit: t('analysisPage:waste.asp.unit'),
      value: ASP?.gradient,
      subData: [
        {
          key: lastYearKey,
          value: ASP?.compareYear,
          renderer: statisticsFormatter,
        },
        {
          key: currYearKey,
          value: ASP?.currentYear,
          renderer: statisticsFormatter,
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

  const labels = [
    `${baseYear} Actual`,
    `${lastYear} Actual`,
    `${currYear} Actual`,
    `${currYear} ${t('analysisPage:aspReduction')}`,
  ];

  const target = wasteIntensity?.baseYear * (1 - pct);
  const option = OPTION(values, labels, target);
  return (
    <AnalysisPage
      type={t('analysisPage:waste.type')}
      title={`${t('analysisPage:waste.title')} ${`(Plant: ${plant || site || '-'})`}`}
      chartTitle={t('analysisPage:waste.chartTitle')}
      tableTitle={t('analysisPage:waste.tableTitle')}
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
