import { useEffect, useMemo, useState } from 'react';

import { format, subDays } from 'date-fns';
import { useTranslation } from 'react-i18next';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import Table from '../../components/table/Table';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

import { baseHeaderRenderer, formatter } from './helpers';

const ROI_COLUMNS = (t) =>
  addPaddingColumns([
    { Header: baseHeaderRenderer(t('airCompressorPage:site')), accessor: 'building' },
    { Header: baseHeaderRenderer(t('airCompressorPage:deviceNumber')), accessor: 'machine_id' },
    { Header: baseHeaderRenderer(t('airCompressorPage:yearOfManufacture')), accessor: 'born_year' },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedPower')),
      accessor: 'power',
      className: 'text-right',
      Cell: baseFormatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedEfficiency')),
      accessor: 'eer',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedEfficiency')),
      accessor: 'predict_eer',
      className: 'text-right',
      Cell: formatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:estimatedRoi')),
      accessor: 'predict_roi',
      className: 'text-right',
      Cell: formatter,
    },
  ]);

const DUMMY_ROI_DATA = [
  { building: '-', machine_id: '-', born_year: '-', power: '-', eer: '-', predict_eer: '-', predict_roi: '-' },
];

const OPTION = ({ data, name, targets, targetColors, keyAlias }) => {
  const labels =
    data?.map(({ date }) => date) ||
    Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 7 - i), 'yyyy-MM-dd HH:mm:ss'));

  const values = data?.map((d) => ({
    value: d.hasOwnProperty('value') ? d.value : d.hasOwnProperty(keyAlias) ? d[keyAlias] : undefined,
  }));

  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const { name, marker, value, seriesName } = params?.[0] || {};
        return `${name} <br> ${marker} ${seriesName} : ${baseFormatter(value, { precision: 2 })}`;
      },
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      axisLabel: { formatter: (value) => format(new Date(value), 'M/d') },
    },
    yAxis: {
      name,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
      ...(targets && { max: (value) => Math.max(Math.ceil(value.max), ...targets.map((target) => Math.ceil(target))) }),
      ...(!data && { min: 0, max: 10 }),
    },
    series: [
      {
        name,
        type: 'line',
        data: values,
        symbol: 'none',
        color: colors.primary['600'],
        ...(targets && {
          markLine: targets.reduce(
            (prev, curr, i) => ({
              ...prev,
              data: prev.data.concat({ yAxis: curr, lineStyle: { color: targetColors[i] } }),
            }),
            {
              symbol: 'none',
              label: { show: true },
              data: [],
              lineStyle: { width: 2 },
              emphasis: { lineStyle: { width: 4 } },
            }
          ),
        }),
      },
    ],
    grid: { bottom: 0, top: 48, left: 12, right: 36, containLabel: true },
  };
};

export default function RoiPanel({ data }) {
  const { t } = useTranslation(['airCompressorPage', 'common']);
  const [_data, setData] = useState(data);
  const eerOption = useMemo(
    () =>
      OPTION({
        data: _data?.weekly?.eer,
        name: 'EER',
        targets: [7.8, 8.7, 9.5],
        targetColors: [colors._yellow, colors._orange, colors._blue],
        keyAlias: 'eer',
      }),
    [_data?.weekly?.eer]
  );

  const roiOption = useMemo(
    () =>
      OPTION({ data: _data?.weekly?.roi, name: 'ROI', targets: [3], targetColors: [colors._orange], keyAlias: 'roi' }),
    [_data?.weekly?.roi]
  );

  const roiColumns = useMemo(() => ROI_COLUMNS(t), [t]);
  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="row-span-1 flex space-x-8 overflow-auto rounded bg-primary-900 p-4 shadow">
      <div className="flex w-[40%] flex-col space-y-4">
        <div className="text-xl font-medium">{t('airCompressorPage:deviceEfficiency/RoiInfo')}</div>
        <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
          <Table columns={roiColumns} data={[].concat(_data?.summary || DUMMY_ROI_DATA)} />
        </div>
      </div>
      <div className="flex w-[30%] flex-col">
        <div className="flex justify-between">
          <div className="whitespace-nowrap">{t('airCompressorPage:deviceWeeklyEfficiencySituation')}</div>
          <div className="flex flex-shrink-0 translate-y-8 -translate-x-12 space-x-4">
            <Legend label={t('airCompressorPage:first')} dotClassName="bg-_blue" />
            <Legend label={t('airCompressorPage:second')} dotClassName="bg-_orange" />
            <Legend label={t('airCompressorPage:third')} dotClassName="bg-_yellow" />
          </div>
        </div>
        <Chart option={eerOption} className="flex-grow" />
      </div>
      <div className="flex w-[30%] flex-col">
        <div>{t('airCompressorPage:deviceWeeklyRoiSituation')}</div>
        <Chart option={roiOption} className="flex-grow" />
      </div>
    </div>
  );
}
