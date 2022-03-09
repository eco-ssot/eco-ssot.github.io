import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useGoal from '../../hooks/useGoal';
import { selectBusiness, selectSite, selectPlant, selectY, selectM } from '../../renderless/location/locationSlice';
import {
  useDeleteWaterExplanationMutation,
  useDeleteWaterImprovementMutation,
  useGetWaterAnalysisQuery,
  useGetWaterExplanationQuery,
  usePatchWaterExplanationMutation,
  usePatchWaterImprovementMutation,
  usePostWaterExplanationMutation,
  usePostWaterImprovementMutation,
} from '../../services/water';
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
    { x, yAxis: comparison, name: ratioFormatter(value / comparison - 1) },
  ];

  if (isBetter) {
    ret.reverse();
  }

  return ret;
}

const OPTION = (values, labels, target) => {
  const [base, prev, curr, asp] = values;
  const currTrend = getMarkLineTrend(curr, base, '66.5%');
  const aspTrend = getMarkLineTrend(asp, base, '92.5%');
  const prevTrend = getMarkLineTrend(asp, prev, '85%');
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
        label: { show: true, position: 'top', color: colors.gray['50'], formatter: baseFormatter },
        markLine: {
          symbol: 'none',
          data: [...markLines, currTrend, prevTrend, aspTrend].concat(
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
    grid: { left: 64, right: 64, top: 64, bottom: 0, containLabel: true },
  };
};

export default function WaterAnalysisPage() {
  const { t } = useTranslation(['analysisPage']);
  const business = useSelector(selectBusiness);
  const site = useSelector(selectSite);
  const plant = useSelector(selectPlant);
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '用水強度', labelType: 'analysis' });
  const { data } = useGetWaterAnalysisQuery({ business, site, plant, year: y, month: m });
  const { data: tableData } = useGetWaterExplanationQuery({ business, site, plant, year: y });
  const [postExplanation] = usePostWaterExplanationMutation();
  const [postImprovement] = usePostWaterImprovementMutation();
  const [patchExplanation] = usePatchWaterExplanationMutation();
  const [patchImprovement] = usePatchWaterImprovementMutation();
  const [deleteExplanation] = useDeleteWaterExplanationMutation();
  const [deleteImprovement] = useDeleteWaterImprovementMutation();
  const { ASP, water, waterIntensity, revenue, shipment } = data || {};
  const currYearKey = `${currYear} YTM`;
  const lastYearKey = `${currYear - 1} YTM`;
  const overview = [
    {
      name: '用水量',
      title: t('analysisPage:water.water.title'),
      unit: t('analysisPage:water.water.unit'),
      value: water?.gradient,
      subData: [
        { key: lastYearKey, value: water?.compareYear },
        { key: currYearKey, value: water?.currentYear },
      ],
    },
    {
      name: '營業額',
      title: t('analysisPage:water.revenue.title'),
      unit: t('analysisPage:water.revenue.unit'),
      value: revenue?.gradient,
      subData: [
        { key: lastYearKey, value: revenue?.compareYear, renderer: (value) => baseFormatter(value, { precision: 2 }) },
        { key: currYearKey, value: revenue?.currentYear, renderer: (value) => baseFormatter(value, { precision: 2 }) },
      ],
    },
    {
      name: '用水強度',
      title: t('analysisPage:water.waterIntensity.title'),
      unit: t('analysisPage:water.waterIntensity.unit'),
      value: waterIntensity?.currentAndCompareGradient,
      subData: [
        { key: lastYearKey, value: waterIntensity?.compareYear },
        { key: currYearKey, value: waterIntensity?.currentYear },
      ],
    },
    {
      name: '出貨量',
      title: t('analysisPage:water.shipment.title'),
      unit: t('analysisPage:water.shipment.unit'),
      value: shipment?.gradient,
      subData: [
        { key: lastYearKey, value: shipment?.compareYear },
        { key: currYearKey, value: shipment?.currentYear },
      ],
    },
    {
      name: 'ASP',
      title: 'ASP',
      unit: t('analysisPage:water.asp.unit'),
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
    waterIntensity?.baseYear,
    waterIntensity?.compareYear,
    waterIntensity?.currentYear,
    waterIntensity?.ASP,
  ];

  const labels = [
    `${baseYear} Actual`,
    `${currYear - 1} Actual`,
    `${currYear} Actual`,
    `${currYear}  ${t('analysisPage:aspReduction')}`,
  ];

  const target = waterIntensity?.baseYear * (1 - pct);
  const option = OPTION(values, labels, target);
  return (
    <AnalysisPage
      title={`${t('analysisPage:water.title')} ${`(Plant: ${plant || site || '-'})`}`}
      chartTitle={t('analysisPage:water.chartTitle')}
      tableTitle={t('analysisPage:water.tableTitle')}
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
