import { useMemo, useState, useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import usePlantPermission from '../../hooks/usePlantPermission';
import { selectMonth, selectYear } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetLatestDateQuery } from '../../services/app';
import { useGetCsrStatusQuery, usePostCsrCommentMutation } from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { plantRenderer, updateMyData } from '../../utils/table';

const BUTTON_GROUP_OPTIONS = [
  { key: 'ELECTRICITY', value: 'electricity' },
  { key: 'WATER', value: 'water' },
];

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

const COLUMNS = ({ setData, postCsrComment, isWater }) => [
  {
    Header: 'Plant',
    accessor: 'plant',
    rowSpan: 0,
    className: 'text-center',
    Cell: plantRenderer,
  },
  {
    Header: `FEM 智慧${isWater ? '水' : '電'}表`,
    accessor: 'fem_amount',
    Cell: csrRenderer,
  },
  { Header: `CSR ${isWater ? '水' : '電'}費帳單`, accessor: 'csr_amount', Cell: csrRenderer },
  { Header: '差異 *', accessor: 'diff', Cell: ratioRenderer, className: 'text-right' },
  {
    Header: '描述',
    accessor: 'comment',
    className: 'w-[50%] px-8 !text-left',
    editable: true,
    editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full' },
  },
  {
    id: 'action',
    Header: '編輯',
    rowSpan: 0,
    className: 'text-center px-4',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { plant, comment, electric_comment, water_comment } = cell.row.original;
            postCsrComment({
              plant: String(plant).split('(')[0].trim(),
              electric_comment,
              water_comment,
              ...(isWater ? { water_comment: comment } : { electric_comment: comment }),
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
  const { hash } = useLocation();
  const [searchOption, setSearchOption] = useState({ year, month });
  const { data: { currYear, currMonth, yearOptions } = {} } = useGetLatestDateQuery();
  const plantPermission = usePlantPermission();
  const { data } = useGetCsrStatusQuery(
    { year: year || currYear, month: month || currMonth, permission: plantPermission },
    { skip: !currYear || !currMonth }
  );

  const [_data, setData] = useState();
  const [postCsrComment] = usePostCsrCommentMutation();
  const isWater = BUTTON_GROUP_OPTIONS[1].key === hash.slice(1);
  const columns = useMemo(
    () =>
      COLUMNS({
        isWater,
        setData,
        postCsrComment: (payload) => postCsrComment({ year: year || currYear, month: month || currMonth, ...payload }),
      }),
    [postCsrComment, setData, year, month, currYear, currMonth, isWater]
  );

  useEffect(() => {
    if (data) {
      setData(isWater ? data.water : data.electricity);
    }
  }, [data, isWater]);

  useEffect(
    () => setSearchOption({ year: year || currYear, month: month || currMonth }),
    [year, month, currYear, currMonth]
  );

  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4">
        <div className="text-xl font-medium">FEM & CSR數值狀態 (每月最後一日更新)</div>
        <ButtonGroup
          className="self-center"
          options={BUTTON_GROUP_OPTIONS}
          selected={isWater ? BUTTON_GROUP_OPTIONS[1] : BUTTON_GROUP_OPTIONS[0]}
          onChange={(e) => navigate({ hash: e.key })}
        />
        <div className="flex space-x-8 justify-center">
          <Select
            label="查詢年度"
            options={yearOptions || APP_CONSTANTS.YEAR_OPTIONS}
            selected={(yearOptions || APP_CONSTANTS.YEAR_OPTIONS).find((option) => option.key === searchOption.year)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
            buttonClassName="min-w-28"
          />
          <Select
            label="查詢月份"
            buttonClassName="w-24"
            options={APP_CONSTANTS.MONTH_OPTIONS}
            selected={
              APP_CONSTANTS.MONTH_OPTIONS.find((option) => option.key === searchOption.month) ||
              APP_CONSTANTS.MONTH_OPTIONS.find((option) => option.key === currMonth)
            }
            onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
          />
          <Button
            onClick={() =>
              navigate({
                year: searchOption.year || currYear,
                month: searchOption.month || currMonth,
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
            data={_data}
            getCellProps={(cell) => ({ className: '!py-1' })}
            getHeaderProps={(header) => ({ className: '!py-2' })}
            updateMyData={updateMyData(setData)}
          />
        </div>
      </div>
    </div>
  );
}
