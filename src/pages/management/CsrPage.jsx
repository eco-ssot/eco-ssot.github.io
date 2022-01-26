import { useMemo, useState, useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectCurrMonth, selectCurrYear, selectYoptions } from '../../app/appSlice';
import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import APP_CONFIG from '../../constants/app-config';
import { selectMonth, selectYear } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetCsrStatusQuery, usePostCsrCommentMutation } from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { plantRenderer, updateMyData } from '../../utils/table';

export const STATUS_MAPPING = {
  0: 'bg-gray-50',
  2: 'bg-primary-500',
  1: 'bg-dangerous-700',
};

const csrRenderer = (cell) => {
  const status = get(cell.row.original, cell.column.id.replace('_amount', ''));
  return (
    <div className="flex items-center justify-between px-8">
      <div className={clsx('rounded-full h-3 w-3 text-center', STATUS_MAPPING[status])}></div>
      <div>{baseFormatter(cell.value)}</div>
    </div>
  );
};

const ratioRenderer = (cell) => baseFormatter(cell.value, { precision: 1, unit: 1e-2, suffix: '%' });

const COLUMNS = ({ setData, postCsrComment }) => [
  {
    Header: 'Plant',
    accessor: 'plant',
    rowSpan: 0,
    className: 'w-[10%] text-center',
    Cell: plantRenderer,
  },
  {
    id: 'electric',
    Header: () => <div className="border-b border-divider py-1">用電</div>,
    columns: [
      { Header: 'FEM 智慧電表', accessor: 'electric.fem_amount', Cell: csrRenderer, className: 'w-[12%] px-2' },
      { Header: 'CSR 電費帳單', accessor: 'electric.csr_amount', Cell: csrRenderer, className: 'w-[12%] px-2' },
      { Header: '差異 *', accessor: 'electric.diff', Cell: ratioRenderer, className: 'text-right w-[6%] px-2' },
      {
        Header: '描述',
        accessor: 'electric.comment',
        className: 'w-[12%] text-center',
        editable: true,
        editableComponentProps: { className: 'text-left' },
      },
    ],
  },
  {
    id: 'water',
    Header: () => <div className="border-b border-divider py-1">用水</div>,
    columns: [
      { Header: 'FEM 智慧水表', accessor: 'water.fem_amount', Cell: csrRenderer, className: 'w-[12%] px-2' },
      { Header: 'CSR 水費帳單', accessor: 'water.csr_amount', Cell: csrRenderer, className: 'w-[12%] px-2' },
      { Header: '差異 *', accessor: 'water.diff', Cell: ratioRenderer, className: 'text-right w-[6%] px-2' },
      {
        Header: '描述',
        accessor: 'water.comment',
        className: 'w-[12%] text-center',
        editable: true,
        editableComponentProps: { className: 'text-left' },
      },
    ],
  },
  {
    id: 'action',
    Header: '編輯',
    rowSpan: 0,
    className: 'w-[6%] text-center',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { plant, electric, water } = cell.row.original;
            postCsrComment({
              plant: String(plant).split('(')[0].trim(),
              water_comment: water.comment,
              electric_comment: electric.comment,
            });
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: false }),
              }))
            );
          }}>
          儲存
        </EditableButton>
      ) : (
        <EditableIconButton
          onClick={() => {
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: true }),
              }))
            );
          }}>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function CsrPage() {
  const { t } = useTranslation(['managementPage']);
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);
  const yearOptions = useSelector(selectYoptions);
  const currYear = useSelector(selectCurrYear);
  const currMonth = useSelector(selectCurrMonth);
  const [searchOption, setSearchOption] = useState({ year, month });
  const { data } = useGetCsrStatusQuery({ year: year || currYear, month: month || currMonth });
  const [_data, setData] = useState();
  const [postCsrComment] = usePostCsrCommentMutation();
  const columns = useMemo(
    () =>
      COLUMNS({
        setData,
        postCsrComment: (payload) => postCsrComment({ year: year || currYear, month: month || currMonth, ...payload }),
      }),
    [postCsrComment, year, month, currYear, currMonth]
  );

  useEffect(() => data && setData(data.data), [data]);
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
        <div className="text-xl font-medium">CSR 對照 (每月最後一日更新)</div>
        <div className="flex space-x-8 justify-center">
          <Select
            label="查詢年度 : "
            options={yearOptions || APP_CONFIG.YEAR_OPTIONS}
            selected={(yearOptions || APP_CONFIG.YEAR_OPTIONS).find((option) => option.key === searchOption.year)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
            buttonClassName="min-w-28"
          />
          <Select
            label="查詢月份 : "
            buttonClassName="w-24"
            options={APP_CONFIG.MONTH_OPTIONS}
            selected={
              APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === searchOption.month) ||
              APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === currMonth)
            }
            onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
          />
          <Button
            onClick={() =>
              navigate({
                year: searchOption.year || currYear,
                month: searchOption.month || APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === currMonth).key,
              })
            }>
            搜尋
          </Button>
        </div>
        <div className="absolute right-10">
          <div className="flex justify-end space-x-4">
            <Legend dotClassName="bg-gray-50" label={t('dataStatus.noData')} />
            <Legend dotClassName="bg-primary-500" label={t('dataStatus.updated')} />
            <Legend dotClassName="bg-dangerous-700" label={t('dataStatus.notUpdated')} />
            <Legend dotClassName="bg-yellow-500" label={t('dataStatus.incorrectData')} />
          </div>
          <div className="flex justify-end">＊差異 = ( FEM - CSR ) / CSR * 100%</div>
        </div>
        <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
          <EditableTable
            columns={columns}
            data={_data || []}
            getCellProps={(cell) => ({ className: '!py-1' })}
            getHeaderProps={(header) => ({ className: '!py-1' })}
            updateMyData={updateMyData(setData)}
          />
        </div>
      </div>
    </div>
  );
}
