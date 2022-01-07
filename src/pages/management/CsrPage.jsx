import { useState } from 'react';

import clsx from 'clsx';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from '../../components/button/Button';
import Legend from '../../components/legend/Legend';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import APP_CONFIG from '../../constants/app-config';
import { selectMonth, selectYear } from '../../renderless/location/locationSlice';
import { navigate } from '../../router/helpers';
import { useGetSummaryQuery } from '../../services/app';
import { useGetCsrStatusQuery } from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns, plantRenderer } from '../../utils/table';

export const STATUS_MAPPING = {
  0: 'bg-gray-50',
  2: 'bg-primary-500',
  1: 'bg-dangerous-700',
};

const csrRenderer = (cell) => {
  const status = get(cell.row.original, cell.column.id.replace('_amount', ''));
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div className={clsx('rounded-full h-3 w-3 text-center', STATUS_MAPPING[status])}></div>
      <div>{baseFormatter(cell.value)}</div>
    </div>
  );
};

const ratioRenderer = (cell) => baseFormatter(cell.value, { precision: 1, unit: 1e-2, suffix: '%' });

const COLUMNS = addPaddingColumns([
  {
    Header: 'Plant',
    accessor: 'plant',
    rowSpan: 0,
    Cell: plantRenderer,
  },
  {
    id: 'electric',
    Header: () => <div className="border-b border-divider py-3">用電</div>,
    columns: [
      { Header: 'FEM 智慧電表', accessor: 'electric.fem_amount', Cell: csrRenderer },
      { Header: 'CSR 電費帳單', accessor: 'electric.csr_amount', Cell: csrRenderer },
      { Header: '差異 *', accessor: 'electric.diff', Cell: ratioRenderer, className: 'text-right' },
    ],
  },
  {
    id: 'water',
    Header: () => <div className="border-b border-divider py-3">用水</div>,
    columns: [
      { Header: 'FEM 智慧水表', accessor: 'water.fem_amount', Cell: csrRenderer },
      { Header: 'CSR 水費帳單', accessor: 'water.csr_amount', Cell: csrRenderer },
      { Header: '差異 *', accessor: 'water.diff', Cell: ratioRenderer, className: 'text-right' },
    ],
  },
]);

export default function CsrPage() {
  const { t } = useTranslation(['managementPage']);
  const year = useSelector(selectYear);
  const month = useSelector(selectMonth);
  const { data: summary } = useGetSummaryQuery();
  const [searchOption, setSearchOption] = useState({ year, month });
  const { data } = useGetCsrStatusQuery(
    { year: year || summary?.currYear, month: month || summary?.currMonth },
    { skip: !summary }
  );

  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-2">
        <div className="text-xl font-medium space-y-2">CSR 對照 (每月最後一日更新)</div>
        <div className="flex space-x-8 justify-center">
          <Select
            label="查詢年度 : "
            options={summary?.yearOptions || APP_CONFIG.YEAR_OPTIONS}
            selected={(summary?.yearOptions || APP_CONFIG.YEAR_OPTIONS).find(
              (option) => option.key === searchOption.year
            )}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
            buttonClassName="min-w-28"
          />
          <Select
            label="查詢月份 : "
            buttonClassName="w-24"
            options={APP_CONFIG.MONTH_OPTIONS}
            selected={
              APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === searchOption.month) ||
              APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === String(summary?.currMonth))
            }
            onChange={(e) => setSearchOption((prev) => ({ ...prev, month: e.key }))}
          />
          <Button
            onClick={() =>
              navigate({
                year: searchOption.year || summary?.currYear,
                month:
                  searchOption.month ||
                  APP_CONFIG.MONTH_OPTIONS.find((option) => option.key === String(summary?.currMonth)).key,
              })
            }>
            搜尋
          </Button>
        </div>
        <div className="flex justify-end space-x-4">
          <Legend dotClassName="bg-gray-50" label={t('dataStatus.noData')} />
          <Legend dotClassName="bg-primary-500" label={t('dataStatus.updated')} />
          <Legend dotClassName="bg-dangerous-700" label={t('dataStatus.notUpdated')} />
          <Legend dotClassName="bg-yellow-500" label={t('dataStatus.incorrectData')} />
        </div>
        <div className="flex justify-end">＊差異 = ( FEM - CSR ) / CSR * 100%</div>
        <div className="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg">
          <Table columns={COLUMNS} data={data?.data || []} />
        </div>
      </div>
    </div>
  );
}
