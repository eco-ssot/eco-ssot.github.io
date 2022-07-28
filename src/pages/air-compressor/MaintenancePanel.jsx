import { useMemo, useState, useEffect, useLayoutEffect, useId } from 'react';

import clsx from 'clsx';

import Chart from '../../charts/Chart';
import Legend from '../../components/legend/Legend';
import Table from '../../components/table/Table';
import { colors } from '../../styles';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';

const DUMMY_EVALUATION_DATA = [{ previous_hour: '-', addition_cost: '-', revenue_cost: '-', revenue_diff: '-' }];
const EVALUATION_COLUMNS = addPaddingColumns([
  {
    Header: '提前時數',
    accessor: 'previous_hour',
    className: 'text-right',
    Cell: (cell) => baseFormatter(cell, { suffix: ' H' }),
  },
  { Header: '增加費用', accessor: 'addition_cost', className: 'text-right', Cell: baseFormatter },
  { Header: '節電費用', accessor: 'revenue_cost', className: 'text-right', Cell: baseFormatter },
  { Header: '提前效益', accessor: 'revenue_diff', className: 'text-right', Cell: baseFormatter },
]);

const SIMULATION_OPTION = ({ data }) => {
  const y = data?.map((d) => d.x);
  const x = data?.map((d) => d.y);
  return {
    xAxis: {
      name: '提升EER\n(m³/KWH)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      data: x,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      splitLine: { show: false },
      ...(!data && { min: 0, max: 1 }),
    },
    yAxis: {
      name: '預估扣除成本額外效益\n(千元)',
      nameTextStyle: { color: colors.gray['50'], align: 'left' },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: y,
      axisLabel: { formatter: (value) => baseFormatter(value, { unit: 1e3 }) },
      ...(!data && { min: 0, max: 10 * 1e3 }),
    },
    series: [
      {
        data: data?.map((d) => ({ value: [d.y, d.x] })),
        type: 'line',
        color: colors.primary['600'],
        symbol: 'none',
      },
    ],
    grid: { bottom: 0, top: 56, left: 12, right: 96, containLabel: true },
  };
};

const COST_OPTION = ({ data, rowIndex = 0 }) => {
  const y = data?.map((d) => d.repaired_roi);
  const x = data?.map((d) => d.previous_hour);
  const target1 = data?.[rowIndex]?.match_roi;
  const target2 = data?.[rowIndex]?.prev_max_hour;
  const line1 = data?.map((d) => ({ value: [d.previous_hour, d.repaired_roi] }));
  const line2 = data?.map((d) => ({ value: [d.previous_hour, d.previous_hour] }));
  const minX = Math.floor(Math.min(...[].concat(x, target1, target2).filter(Boolean)));
  const maxY = Math.ceil(Math.max(...[].concat(x, y, target1, target2).filter(Boolean)));
  const segments = [target1].concat(x?.filter((d) => d > target1 && d < target2)?.filter(Boolean)).concat(target2);
  return {
    xAxis: {
      name: '提前保養\n時數 (H)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      data: x,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: colors.gray['500'], lineHeight: 16 } },
      splitLine: { show: false },
      min: Math.min(0, minX),
      maxInterval: 500,
      minInterval: 500,
      ...((!data || rowIndex === -1) && { min: 0, max: 2500 }),
    },
    yAxis: {
      name: 'ROI (H)',
      nameTextStyle: { color: colors.gray['50'] },
      type: 'value',
      axisLine: { show: true, lineStyle: { color: colors.gray['500'] } },
      splitLine: { show: false },
      axisTick: { show: false },
      data: y,
      max: maxY,
      ...((!data || rowIndex === -1) && { min: 0, max: 2500 }),
    },
    series: [
      ...(data && rowIndex > -1
        ? [
            {
              data: line1,
              type: 'line',
              color: colors._blue,
              symbol: 'none',
            },
            {
              data: [{ value: [target1, target1] }, { value: [target2, target2] }],
              type: 'line',
              areaStyle: {
                color: colors.primary['500'],
                opacity: 0.2,
                origin: target1,
              },
              lineStyle: {
                color: 'transparent',
              },
              symbol: 'none',
              silent: true,
            },
            ...segments?.slice(0, -1)?.map((d, i) => ({
              data: [
                { value: [d, data?.find((_d) => d === _d.previous_hour)?.repaired_roi || target1] },
                {
                  value: [
                    segments[i + 1],
                    data?.find((_d) => segments[i + 1] === _d.previous_hour)?.repaired_roi || target1,
                  ],
                },
              ],
              type: 'line',
              areaStyle: {
                color: colors.primary['500'],
                opacity: 0.2,
                origin: target1,
              },
              lineStyle: {
                color: 'transparent',
              },
              symbol: 'none',
              silent: true,
            })),
            {
              type: 'line',
              markLine: {
                symbol: 'none',
                data: [
                  {
                    xAxis: target1,
                    lineStyle: { color: colors._orange },
                    label: { show: false },
                  },
                  {
                    xAxis: target2,
                    lineStyle: { color: colors.gray['50'] },
                    label: { show: false },
                  },
                  [
                    {
                      coord: line2?.[0]?.value,
                      lineStyle: {
                        type: 'solid',
                        color: colors._yellow,
                        width: 2,
                        emphasis: { width: 2 },
                      },
                    },
                    { coord: line2?.slice(-1)?.[0]?.value },
                  ],
                ],
                lineStyle: { width: 2 },
              },
            },
            {
              type: 'line',
              markLine: {
                symbol: 'none',
                animation: false,
                silent: true,
                data: [
                  [
                    {
                      name: 'ROI >\n提前月數',
                      coord: [0, maxY],
                      lineStyle: {
                        color: 'transparent',
                      },
                      label: {
                        position: 'insideEndBottom',
                        color: colors.gray['300'],
                      },
                    },
                    { coord: [target1, maxY] },
                  ],
                  [
                    {
                      name: 'ROI <\n提前月數',
                      coord: [target1, maxY],
                      lineStyle: {
                        color: 'transparent',
                      },
                      label: {
                        position: 'insideMiddleBottom',
                        color: colors.gray['300'],
                      },
                    },
                    { coord: [target2, maxY] },
                  ],
                  [
                    {
                      name: '與前次保養太近\n耗材尚為全新',
                      coord: [target2, maxY],
                      lineStyle: {
                        color: 'transparent',
                      },
                      label: {
                        position: 'insideStartBottom',
                        color: colors.gray['300'],
                      },
                    },
                    {
                      coord: [line2?.slice(-1)?.[0]?.value?.[0], maxY],
                    },
                  ],
                ],
              },
            },
          ]
        : []),
    ],
    grid: { bottom: 0, top: 48, left: 12, right: 96, containLabel: true },
  };
};

export default function MaintenancePanel({ className, data, machineId }) {
  const [_data, setData] = useState(data);
  const evaluationColumns = useMemo(() => EVALUATION_COLUMNS, []);
  const simulationOption = useMemo(() => SIMULATION_OPTION({ data: _data?.simulating }), [_data?.simulating]);
  const [rowIndex, setRowIndex] = useState(-1);
  const costOption = useMemo(() => COST_OPTION({ data: _data?.info }), [_data?.info]);
  const id = useId();
  useEffect(() => {
    setData(data);
    if (data) {
      const targetIndex = data?.info?.findIndex((d) => d.previous_hour === data?.recommand?.best_previous_hour);
      setRowIndex(targetIndex);
    } else {
      setRowIndex(-1);
    }
  }, [data]);

  useLayoutEffect(() => {
    if (rowIndex > -1) {
      if (rowIndex < 2) {
        document.getElementById(id)?.scrollTo({ top: 0 });
      } else {
        document.getElementById(data?.info?.[rowIndex]?.id)?.scrollIntoView(true);
      }
    }
  }, [data?.info, id, rowIndex]);

  return (
    <div
      className={clsx('grid grid-cols-4 grid-rows-1 gap-4 overflow-auto rounded bg-primary-900 p-4 shadow', className)}
    >
      <div className="flex flex-grow grid-cols-1 flex-col space-y-2">
        <div className="text-xl font-medium">設備保養成本攤提資訊</div>
        <div className="flex flex-wrap justify-end space-x-2">
          <Legend label="ROI 曲線" dotClassName="bg-_blue" labelClassName="text-sm" />
          <Legend label="比較基準" dotClassName="bg-_yellow" labelClassName="text-sm" />
          <Legend label="提前保養產出效益" dotClassName="bg-primary-500" labelClassName="text-sm" />
          <Legend label="ROI = 提前月數" dotClassName="bg-_orange" labelClassName="text-sm" />
        </div>
        <Chart option={costOption} className="flex-grow" />
      </div>
      <div className="flex grid-cols-1 flex-col space-y-4 overflow-auto">
        <div className="text-xl font-medium">設備提前保養效益評估資訊 {machineId && `(設備編號：${machineId})`}</div>
        <div id={id} className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={evaluationColumns}
            data={_data ? _data?.info : DUMMY_EVALUATION_DATA}
            getRowProps={(row) => ({
              className: clsx(rowIndex === row.index && 'bg-primary-600 bg-opacity-50'),
              id: row.original.id,
            })}
          />
        </div>
      </div>
      <div className="flex grid-cols-1 flex-col space-y-4 overflow-auto">
        <div className="text-xl font-medium">設備提前保養效益建議資訊</div>
        <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
          <div className="flex flex-shrink-0 justify-between bg-primary-800 px-4 py-3">
            <div className="text-lg font-medium">最佳提前保養時數</div>
            <div className="text-lg font-medium">{_data?.recommand?.best_previous_hour} H</div>
          </div>
          <div className="flex flex-grow flex-col space-y-4 overflow-auto rounded-b border border-t-0 border-divider px-4 pt-4  text-lg">
            <div className="flex justify-between">
              <div>提前保養產出效益(已扣除提前費用)</div>
              <div>{baseFormatter(_data?.recommand?.revenue_diff_max)}</div>
            </div>
            <div className="flex justify-between">
              <div>提前效益 / 保養成本</div>
              <div>{baseFormatter(_data?.recommand?.revenue_rate, { unit: 1e-2, suffix: '%' })}</div>
            </div>
            <div className="flex justify-between">
              <div>距最佳保養時間</div>
              <div>{baseFormatter(_data?.recommand?.now_pass_hour, { suffix: ' H' })}</div>
            </div>
            <div className="flex justify-between">
              <div>預期保養日期</div>
              <div>{_data?.recommand?.best_maintain_time}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-grow grid-cols-1 flex-col space-y-4">
        <div className="text-xl font-medium">遵循最佳提前保養實際效益模擬</div>
        <Chart option={simulationOption} className="flex-grow" />
      </div>
    </div>
  );
}
