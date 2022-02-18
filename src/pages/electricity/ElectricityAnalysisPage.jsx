import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useGoal from '../../hooks/useGoal';
import { selectBusiness, selectSite, selectPlant, selectY, selectM } from '../../renderless/location/locationSlice';
import {
  useDeleteElectricityExplanationMutation,
  useDeleteElectricityImprovementMutation,
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
  const { t } = useTranslation(['analysisPage']);
  const business = useSelector(selectBusiness);
  const site = useSelector(selectSite);
  const plant = useSelector(selectPlant);
  const y = useSelector(selectY);
  const m = useSelector(selectM);
  const { label, pct, baseYear, currYear } = useGoal({ keyword: '用電強度', labelType: 'analysis' });
  const { data } = useGetElectricityAnalysisQuery({ business, site, plant, year: y, month: m });
  const { data: tableData } = useGetElectricityExplanationQuery({ business, site, plant, year: y, month: m });
  const [postExplanation] = usePostElectricityExplanationMutation();
  const [postImprovement] = usePostElectricityImprovementMutation();
  const [patchExplanation] = usePatchElectricityExplanationMutation();
  const [patchImprovement] = usePatchElectricityImprovementMutation();
  const [deleteExplanation] = useDeleteElectricityExplanationMutation();
  const [deleteImprovement] = useDeleteElectricityImprovementMutation();
  const { ASP, electrcity, electrcityIntensity, revenue, shipment } = data || {};
  const currYearKey = `${currYear} YTM`;
  const lastYearKey = `${baseYear} YTM`;
  const overview = [
    {
      name: '用電量',
      title: t('analysisPage:electricity.electricity.title'),
      unit: t('analysisPage:electricity.electricity.unit'),
      value: electrcity?.gradient,
      subData: [
        { key: lastYearKey, value: electrcity?.compareYear },
        { key: currYearKey, value: electrcity?.currentYear },
      ],
    },
    {
      name: '營業額',
      title: t('analysisPage:electricity.revenue.title'),
      unit: t('analysisPage:electricity.revenue.unit'),
      value: revenue?.gradient,
      subData: [
        { key: lastYearKey, value: revenue?.compareYear },
        { key: currYearKey, value: revenue?.currentYear },
      ],
    },
    {
      name: '用電強度',
      title: t('analysisPage:electricity.electricityIntensity.title'),
      unit: t('analysisPage:electricity.electricityIntensity.unit'),
      value: electrcityIntensity?.gradient,
      subData: [
        { key: lastYearKey, value: electrcityIntensity?.compareYear },
        { key: currYearKey, value: electrcityIntensity?.currentYear },
      ],
    },
    {
      name: '出貨量',
      title: t('analysisPage:electricity.shipment.title'),
      unit: t('analysisPage:electricity.shipment.unit'),
      value: shipment?.gradient,
      subData: [
        { key: lastYearKey, value: shipment?.compareYear },
        { key: currYearKey, value: shipment?.currentYear },
      ],
    },
    {
      name: 'ASP',
      title: 'ASP',
      unit: t('analysisPage:electricity.asp.unit'),
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
  const labels = [`${baseYear} Actual`, `${currYear} Actual`, `${currYear} ${t('analysisPage:aspReduction')}`];
  const target = electrcityIntensity?.compareYear * (1 - pct);
  const option = OPTION(values, labels, target);
  return (
    <AnalysisPage
      hasCategory
      title={`${t('analysisPage:electricity.title')} ${`(Plant: ${plant || site || '-'})`}`}
      chartTitle={t('analysisPage:electricity.chartTitle')}
      tableTitle={t('analysisPage:electricity.tableTitle')}
      target={label}
      overview={overview}
      tableData={tableData?.data}
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
