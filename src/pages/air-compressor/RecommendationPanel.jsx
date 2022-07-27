import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { renderToString } from 'react-dom/server';
import { useTranslation } from 'react-i18next';

import Chart from '../../charts/Chart';
import { tooltip } from '../../charts/tooltip';
import Legend from '../../components/legend/Legend';
import Table from '../../components/table/Table';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

import { COMPRESS_DICTIONARY, OIL_DICTIONARY } from './dictionary';
import { baseHeaderRenderer, formatter } from './helpers';

const OLD_MACHINE_COLUMNS = (t) =>
  addPaddingColumns([
    { Header: 'No.', accessor: 'rank' },
    { Header: baseHeaderRenderer(t('airCompressorPage:deviceNumber')), accessor: 'machine' },
    { Header: baseHeaderRenderer(t('airCompressorPage:yearOfManufacture')), accessor: 'born_year' },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedPower')),
      accessor: 'power',
      className: 'text-right',
      Cell: baseFormatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedDisplacement')),
      accessor: 'flow',
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

const NEW_MACHINE_COLUMNS = (t) =>
  addPaddingColumns([
    { Header: 'No.', accessor: 'reank' },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:lubrication')),
      accessor: 'oil_type',
      Cell: (cell) => (OIL_DICTIONARY[cell.value] ? t(`airCompressorPage:${OIL_DICTIONARY[cell.value]}`) : cell.value),
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:compression')),
      accessor: 'compress_type',
      Cell: (cell) =>
        COMPRESS_DICTIONARY[cell.value] ? t(`airCompressorPage:${COMPRESS_DICTIONARY[cell.value]}`) : cell.value,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedPower')),
      accessor: 'power',
      className: 'text-right',
      Cell: baseFormatter,
    },
    {
      Header: baseHeaderRenderer(t('airCompressorPage:ratedDisplacement')),
      accessor: 'flow',
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
      Header: baseHeaderRenderer(t('airCompressorPage:price')),
      accessor: 'cost',
      className: 'text-right',
      Cell: baseFormatter,
    },
  ]);

const COST_OPTION = ({ t, oldCost, newCost }) => {
  const labels = oldCost?.data?.slice(0, 6)?.map(({ year }) => year) || Array.from({ length: 6 }, (_, i) => i + 1);
  const oldValues = oldCost?.data?.slice(0, 6)?.map(({ cost }) => ({ value: cost }));
  const newValues = newCost?.data?.slice(0, 6)?.map(({ cost }) => ({ value: cost }));
  const target = newCost?.data?.slice(-1)?.[0]?.year;
  return {
    tooltip: {
      ...tooltip({
        formatter: (dataset) => {
          return renderToString(
            <div className="flex flex-col rounded bg-gray-900 bg-opacity-75 py-2 shadow">
              <div className="flex items-baseline justify-between space-x-4 border-b border-divider px-4 pb-2">
                {dataset[0]?.name} ({t('common:yearText')})
              </div>
              <div className="flex items-center space-x-2 px-4 py-1 pt-2">
                <div className="block h-3 w-3 rounded-full bg-_blue"></div>
                <div>{t('airCompressorPage:backup')} :</div>
                <div>
                  {baseFormatter(dataset.find((d) => d.seriesName === oldCost.name)?.value, {
                    unit: 1e4,
                    suffix: ` (${t('common:10k')})`,
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4 py-1">
                <div className="block h-3 w-3 rounded-full bg-_yellow"></div>
                <div>{t('airCompressorPage:newDevice')} :</div>
                <div className="flex items-baseline">
                  {baseFormatter(dataset.find((d) => d.seriesName === newCost.name)?.value, {
                    unit: 1e4,
                    suffix: ` (${t('common:10k')})`,
                  })}
                </div>
              </div>
            </div>
          );
        },
      }),
    },
    xAxis: {
      name: `(${t('common:yearText')})`,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name: `(${t('common:10k')})`,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
      axisLabel: { formatter: (value) => baseFormatter(value, { unit: 1e4 }) },
    },
    series: [
      {
        name: oldCost.name,
        type: 'line',
        data: oldValues,
        symbol: 'none',
        color: colors._blue,
      },
      {
        name: newCost.name,
        type: 'line',
        data: newValues,
        symbol: 'none',
        color: colors._yellow,
        ...(target && {
          markLine: {
            data: [{ xAxis: target }],
            symbol: 'none',
            lineStyle: { color: colors._orange, width: 2 },
            label: { show: false },
            emphasis: { lineStyle: { width: 4 } },
          },
        }),
      },
    ],
    grid: { bottom: 0, top: 36, left: 24, right: 48, containLabel: true },
  };
};

const DUMMY_OLD_MACHINE_DATA = [
  { rank: '1', machine: '-', born_year: '-', power: '-', predict_eer: '-', predict_roi: '-' },
];

const DUMMY_NEW_MACHING_DATA = [
  { reank: '1', oil_type: '-', compress_type: '-', power: '-', flow: '-', predict_eer: '-', cost: '-' },
];

export default function RecommendationPanel({ data, className }) {
  const { t } = useTranslation(['airCompressorPage', 'common']);
  const [machineIndex, setMachineIndex] = useState({ old: -1, new: -1 });
  const [_data, setData] = useState(data);
  const costOption = useMemo(
    () =>
      COST_OPTION({
        t,
        oldCost: { data: _data?.recommand?.old?.[machineIndex.old]?.predict_cost, name: t('airCompressorPage:backup') },
        newCost: {
          data: _data?.recommand?.new?.[machineIndex.new]?.predict_cost,
          name: t('airCompressorPage:newDevice'),
        },
      }),
    [t, _data?.recommand, machineIndex.old, machineIndex.new]
  );

  const oldMachineColumns = useMemo(() => OLD_MACHINE_COLUMNS(t), [t]);
  const newMachineColumns = useMemo(() => NEW_MACHINE_COLUMNS(t), [t]);
  useEffect(() => {
    setData(data);
    if (data) {
      setMachineIndex({ old: 0, new: 0 });
    } else {
      setMachineIndex({ old: -1, new: -1 });
    }
  }, [data]);

  return (
    <div className={clsx('flex space-x-4 overflow-auto rounded bg-primary-900 p-4 shadow', className)}>
      <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
        <div className="text-xl font-medium">{t('airCompressorPage:recommendedBackupDevicesInfo')}</div>
        <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={oldMachineColumns}
            data={_data?.recommand?.old || DUMMY_OLD_MACHINE_DATA}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', machineIndex.old === row.index && 'bg-_blue bg-opacity-20'),
              onClick: () =>
                machineIndex.old === row.index
                  ? setMachineIndex((prev) => ({ ...prev, old: -1 }))
                  : setMachineIndex((prev) => ({ ...prev, old: row.index })),
            })}
          />
        </div>
      </div>
      <div className="flex w-[36%] flex-col space-y-4 overflow-auto">
        <div className="text-xl font-medium">{t('airCompressorPage:recommendedNewDevicesInfo')}</div>
        <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={newMachineColumns}
            data={_data?.recommand?.new || DUMMY_NEW_MACHING_DATA}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', machineIndex.new === row.index && 'bg-_yellow bg-opacity-20'),
              onClick: () =>
                machineIndex.new === row.index
                  ? setMachineIndex((prev) => ({ ...prev, new: -1 }))
                  : setMachineIndex((prev) => ({ ...prev, new: row.index })),
            })}
          />
        </div>
      </div>
      <div className="flex w-[28%] flex-col space-y-4">
        <div className="flex justify-between">
          <div className="text-xl font-medium">{t('airCompressorPage:estimatedCostReduction')}</div>
          <div className="flex space-x-4">
            <Legend label={t('airCompressorPage:backup')} dotClassName="bg-_blue" />
            <Legend label={t('airCompressorPage:newDevice')} dotClassName="bg-_yellow" />
          </div>
        </div>
        <Chart option={costOption} className="flex-grow" />
      </div>
    </div>
  );
}
