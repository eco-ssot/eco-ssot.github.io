import { useMemo, useState } from 'react';

import clsx from 'clsx';
import { format, subDays } from 'date-fns';
import { isEmpty, pick } from 'lodash';
import { useSearchParams } from 'react-router-dom';

import Chart from '../../charts/Chart';
import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import useNavigate from '../../router/useNavigate';
import { useGetRoiQuery } from '../../services/airCompressor';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

const BUILDING_OPTIONS = [{ key: 'Fab12', value: 'Fab12' }];
const MACHINE_OPTIONS = [{ key: '6#', value: '6#' }];
const OIL_TYPES = [{ key: '無油', value: '無油' }];
const COMPRESS_TYPES = [{ key: '離心', value: '離心' }];
const OPERATION_TYPES = [{ key: '變頻', value: '變頻' }];
const ROI_COLUMNS = addPaddingColumns([
  { Header: '廠區資訊', accessor: 'building' },
  { Header: '設備編號', accessor: 'machine_id' },
  { Header: '出廠年份', accessor: 'born_year' },
  { Header: '額定功率', accessor: 'power', className: 'text-right', Cell: baseFormatter },
  { Header: '額定能效', accessor: 'eer', className: 'text-right', Cell: baseFormatter },
  { Header: '評估能效', accessor: 'predict_eer', className: 'text-right', Cell: baseFormatter },
  { Header: '評估 ROI', accessor: 'predict_roi', className: 'text-right', Cell: baseFormatter },
]);

const OLD_MACHINE_COLUMNS = addPaddingColumns([
  { Header: 'No.', accessor: 'rank' },
  { Header: '設備編號', accessor: 'machine' },
  { Header: '出廠年份', accessor: 'born_year' },
  { Header: '額定功率', accessor: 'power', className: 'text-right', Cell: baseFormatter },
  { Header: '額定排氣量', accessor: 'flow', className: 'text-right', Cell: baseFormatter },
  { Header: '評估能效', accessor: 'predict_eer', className: 'text-right', Cell: baseFormatter },
  { Header: '評估 ROI', accessor: 'predict_roi', className: 'text-right', Cell: baseFormatter },
]);

const NEW_MACHINE_COLUMNS = addPaddingColumns([
  { Header: 'No.', accessor: 'rank' },
  { Header: '潤滑類型', accessor: 'oil_type' },
  { Header: '壓縮類型', accessor: 'compress_type' },
  { Header: '額定功率', accessor: 'power', className: 'text-right', Cell: baseFormatter },
  { Header: '額定排氣量', accessor: 'flow', className: 'text-right', Cell: baseFormatter },
  { Header: '評估能效', accessor: 'predict_eer', className: 'text-right', Cell: baseFormatter },
  { Header: '設備價格', accessor: 'cost', className: 'text-right', Cell: baseFormatter },
]);

const DUMMY_ROI_DATA = [
  { building: '-', machine_id: '-', born_year: '-', power: '-', eer: '-', predict_eer: '-', predict_roi: '-' },
];

const DUMMY_OLD_MACHINE_DATA = [
  { rank: '1', machine: '-', born_year: '-', power: '-', predict_eer: '-', predict_roi: '-' },
];

const DUMMY_NEW_MACHING_DATA = [
  { rank: '1', oil_type: '-', compress_type: '-', power: '-', flow: '-', predict_eer: '-', cost: '-' },
];

const OPTION = ({ data, name, target }) => {
  const labels =
    data?.map(({ date }) => format(new Date(date), 'M/d')) ||
    Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 7 - i), 'M/d'));

  const values = data?.map(({ value }) => ({ value }));
  return {
    xAxis: {
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name,
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
    },
    series: [
      {
        type: 'line',
        name: 'EER',
        data: values,
        symbol: 'none',
        lineStyle: {
          color: colors.primary['600'],
        },
        ...(target && {
          markLine: {
            data: [{ yAxis: target }],
            symbol: 'none',
            lineStyle: { color: colors._orange },
            label: { show: false },
          },
        }),
      },
    ],
    grid: { bottom: 0, top: 48, left: 12, right: 0, containLabel: true },
  };
};

const COST_OPTION = (data) => {
  const labels = data?.map(({ year }) => year) || Array.from({ length: 5 }, (_, i) => i + 1);
  const oldCost = data?.map(({ old_cost }) => ({ value: old_cost }));
  const newCost = data?.map(({ new_cost }) => ({ value: new_cost }));
  return {
    xAxis: {
      name: '(年)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
    },
    yAxis: {
      name: '(萬元)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
    },
    series: [
      {
        type: 'line',
        data: oldCost,
        symbol: 'none',
        lineStyle: {
          color: colors._blue,
        },
      },
      {
        type: 'line',
        data: newCost,
        symbol: 'none',
        lineStyle: {
          color: colors._yellow,
        },
      },
    ],
    grid: { bottom: 0, top: 48, left: 24, right: 48, containLabel: true },
  };
};

export default function AirCompressorPage() {
  const [searchParams] = useSearchParams();
  const option = pick(Object.fromEntries(searchParams), [
    'building',
    'machine',
    'oil_type',
    'compress_type',
    'operation_type',
  ]);

  const [searchOption, setSearchOption] = useState(option);
  const { data } = useGetRoiQuery(option, { skip: isEmpty(option) });
  const machineOption = useMemo(
    () => OPTION({ data: data?.weekly?.machines, name: 'EER', target: data?.summary?.eer }),
    [data?.weekly?.machines, data?.summary?.eer]
  );

  const roiOption = useMemo(
    () => OPTION({ data: data?.weekly?.roi, name: 'ROI', target: data?.summary?.predict_roi }),
    [data?.weekly?.roi, data?.summary?.predict_roi]
  );

  const costOption = useMemo(() => COST_OPTION(data?.cost), [data?.cost]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4 p-4 pt-20 -mt-16 h-screen w-screen overflow-hidden">
      <div className={clsx('bg-primary-900 rounded shadow p-4')}>
        <div className="text-xl font-medium">空壓設備智能推薦</div>
        <div className="flex flex-grow justify-center space-x-8">
          <div className="border-r-2 border-divider pr-8 space-y-4">
            <div>欲評估設備</div>
            <div className="flex space-x-4">
              <Select
                label="廠區資訊"
                options={BUILDING_OPTIONS}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, building: e.key }))}
              />
              <Select
                label="設備編號"
                options={MACHINE_OPTIONS}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, machine: e.key }))}
              />
            </div>
          </div>
          <div className="border-r-2 border-divider pr-8 space-y-4">
            <div>新機台規格</div>
            <div className="flex space-x-4">
              <Select
                label="潤滑類型"
                options={OIL_TYPES}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, oil_type: e.key }))}
              />
              <Select
                label="壓縮類型"
                options={COMPRESS_TYPES}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, compress_type: e.key }))}
              />
              <Select
                label="運轉類型"
                options={OPERATION_TYPES}
                onChange={(e) => setSearchOption((prev) => ({ ...prev, operation_type: e.key }))}
              />
            </div>
          </div>
          <Button
            className="self-end"
            onClick={() =>
              navigate({
                ...searchOption,
                ...(!option.building && { building: BUILDING_OPTIONS[0].key }),
                ...(!option.machine && { machine: MACHINE_OPTIONS[0].key }),
                ...(!option.oil_type && { oil_type: OIL_TYPES[0].key }),
                ...(!option.compress_type && { compress_type: COMPRESS_TYPES[0].key }),
                ...(!option.operation_type && { operation_type: OPERATION_TYPES[0].key }),
              })
            }>
            計算能效
          </Button>
        </div>
      </div>
      <div className="flex-grow grid grid-rows-2 gap-4 overflow-auto">
        <div className="row-span-1 bg-primary-900 rounded shadow flex space-x-8 p-4 overflow-auto">
          <div className="w-[40%] flex flex-col space-y-4">
            <div className="text-xl font-medium">設備能效 / ROI資訊</div>
            <div className="flex flex-col flex-grow rounded-t-lg overflow-auto shadow mb-1">
              <Table columns={ROI_COLUMNS} data={[].concat(data?.summary || DUMMY_ROI_DATA)} />
            </div>
          </div>
          <div className="w-[30%] flex flex-col">
            <div>設備能效近一週狀況</div>
            <Chart option={machineOption} className="flex-grow" />
          </div>
          <div className="w-[30%] flex flex-col">
            <div>設備ROI近一週狀況</div>
            <Chart option={roiOption} className="flex-grow" />
          </div>
        </div>
        <div className="row-span-1 bg-primary-900 rounded shadow p-4 flex space-x-4 overflow-auto">
          <div className="w-[36%] flex flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">既有備機設備推薦資訊</div>
            <div className="flex flex-col flex-grow rounded-t-lg overflow-auto shadow mb-1">
              <Table columns={OLD_MACHINE_COLUMNS} data={data?.recommand?.old || DUMMY_OLD_MACHINE_DATA} />
            </div>
          </div>
          <div className="w-[36%] flex flex-col space-y-4 overflow-auto">
            <div className="text-xl font-medium">新機設備推薦資訊</div>
            <div className="flex flex-col flex-grow rounded-t-lg overflow-auto shadow mb-1">
              <Table columns={NEW_MACHINE_COLUMNS} data={data?.recommand?.new || DUMMY_NEW_MACHING_DATA} />
            </div>
          </div>
          <div className="w-[28%] flex flex-col space-y-4">
            <div className="flex justify-between">
              <div className="text-xl font-medium">汰換後累積減少成本預估</div>
              <div className="flex space-x-4">
                <Legend label="備機設備" dotClassName="bg-_blue" />
                <Legend label="新設備" dotClassName="bg-_yellow" />
              </div>
            </div>
            <Chart option={costOption} className="flex-grow" />
          </div>
        </div>
      </div>
    </div>
  );
}
