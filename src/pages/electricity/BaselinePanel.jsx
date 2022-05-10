import { useState, useMemo } from 'react';

import { ArrowUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { get, isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'react-use';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import usePlantPermission from '../../hooks/usePlantPermission';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';
import { useGetElectricityBaselineQuery } from '../../services/electricity';
import { useGetPlantOptionsQuery } from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { addPaddingColumns } from '../../utils/table';
import ElectricityIndexPage from '../electricity-index/ElectricityIndexPage';

import { BASE_LINE_DETAIL_ENTRIES, gapFormatter, getPlants } from './helpers';

const BASE_LINE_SUB_COLUMNS = [
  { key: 'actual', value: 'actualElectricity' },
  { key: 'baseline', value: 'baseline' },
  { key: 'gap', value: 'gap' },
];

const BASE_LINE_COLUMNS = (t, setOpen) =>
  addPaddingColumns([
    {
      Header: t('baselinePage:baselinePanel.table.month'),
      accessor: 'month',
      rowSpan: 0,
      Cell: (cell) => `${t(`common:month.${Number(cell.value)}`)}${t(`common:month.text`)}`,
      className: 'whitespace-nowrap',
    },
    ...APP_CONSTANTS.ELECTRICITY_TYPES.map(({ key, value }) => ({
      id: key,
      Header: <div className="border-b border-divider py-3">{t(`baselinePage:baselinePanel.table.${value}`)}</div>,
      columns: BASE_LINE_SUB_COLUMNS.map(({ key: _key, value: _value }) => ({
        Header: t(`baselinePage:baselinePanel.table.${_value}`),
        accessor: [key, _key].join('.'),
        className: 'text-right',
        Cell: baseFormatter,
        ...(_key === 'gap' && {
          Cell: gapFormatter,
        }),
      })),
    })),
    {
      id: 'electricity_target',
      Header: (
        <div className="flex items-center justify-center space-x-2 border-b border-divider py-3">
          <div>用電指標</div>
          <div
            className="group cursor-pointer rounded border border-gray-200 hover:border-gray-50"
            onClick={() => setOpen((prev) => !prev)}>
            <ArrowUpIcon className="h-5 w-5 rotate-45 text-gray-200 group-hover:text-gray-50" />
          </div>
        </div>
      ),
      columns: [
        {
          Header: '用電強度 (千度)',
          accessor: 'electricity_target.intensity',
          className: 'text-right',
          Cell: baseFormatter,
        },
        {
          Header: '約當單台用電 (度)',
          accessor: 'electricity_target.unit',
          className: 'text-right',
          Cell: (cell) => baseFormatter(cell.value, { precision: 1 }),
        },
        {
          Header: 'ASP (千台幣/台)',
          accessor: 'electricity_target.asp',
          className: 'text-right',
          Cell: (cell) => baseFormatter(cell.value, { precision: 2 }),
        },
      ],
    },
  ]);

export function BaselineSearch({ business, y, m, cy, s, p, ...option }) {
  const { t } = useTranslation(['component']);
  const [searchOption, setSearchOption] = useState(option);
  const { data: { yearOptions } = {} } = useGetLatestDateQuery();
  const { data } = useGetPlantOptionsQuery({ bo: business });
  const plantPermission = usePlantPermission();
  const plantOptions = useMemo(() => getPlants({ data, s, p, plantPermission }), [data, s, p, plantPermission]);
  const nextYearOptions = useMemo(() => yearOptions?.filter((option) => Number(option.key) > 2020), [yearOptions]);
  const navigate = useNavigate();
  useDeepCompareEffect(() => {
    if (option.plant && plantOptions && !plantOptions.find((opt) => opt.key === option.plant)) {
      navigate({ plant: plantOptions[0]?.key });
    }
  }, [plantOptions, option]);

  useDeepCompareEffect(() => option && setSearchOption(option), [option]);
  return (
    <div className="flex w-full items-center justify-center space-x-8">
      <Select
        label={t('component:selectLabel.searchYear')}
        options={nextYearOptions || APP_CONSTANTS.YEAR_OPTIONS}
        selected={(nextYearOptions || APP_CONSTANTS.YEAR_OPTIONS).find((option) => option.key === searchOption.year)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
        buttonClassName="min-w-28"
      />
      <Select
        buttonClassName="w-36"
        label="Plant"
        placeholder="Select Plant"
        options={plantOptions}
        selected={plantOptions?.find((option) => option.key === searchOption.plant)}
        onChange={(e) => setSearchOption((prev) => ({ ...prev, plant: e.key }))}
      />
      <Button
        onClick={() =>
          navigate({
            ...searchOption,
            ...(!searchOption.year && { year: nextYearOptions[0]?.key }),
            ...(!searchOption.plant && { plant: plantOptions[0]?.key }),
          })
        }>
        {t('component:button.search')}
      </Button>
    </div>
  );
}

export default function BaselinePanel({ year, plant, business }) {
  const { t } = useTranslation(['baselinePage', 'common']);
  const option = { year, plant };
  const skip = Object.values(option).some(isNil);
  const [selectedRow, setSelectedRow] = useState(-1);
  const { data } = useGetElectricityBaselineQuery({ ...option, bo: business }, { skip });
  const [open, setOpen] = useState(false);
  const columns = useMemo(() => BASE_LINE_COLUMNS(t, setOpen), [t]);
  if (isNil(data)) {
    return null;
  }

  const r = data.data[selectedRow] || {};
  return (
    <>
      <Modal
        className="my-0 max-w-[calc(100vw-6rem)] bg-gray-900"
        open={open}
        setOpen={setOpen}
        onClose={setOpen}
        title="用電指標資訊"
        defaultFooter={false}>
        <ElectricityIndexPage className="h-[calc(100vh-6rem)] w-[calc(100vw-6rem)]" year={year} plant={plant} />
      </Modal>
      <div className="grid grid-cols-6 gap-4 overflow-auto">
        <div className="col-span-5 mb-2 flex w-full flex-col overflow-auto rounded-t-lg shadow">
          <Table
            columns={columns}
            data={data.data}
            getRowProps={(row) => ({
              className: clsx('cursor-pointer', selectedRow === row.index && 'bg-primary-600 bg-opacity-20'),
              onClick: () => (selectedRow === row.index ? setSelectedRow(-1) : setSelectedRow(row.index)),
            })}
          />
        </div>
        <div className="col-span-1 mb-2 flex flex-col overflow-auto rounded-t-lg shadow">
          <div className="sticky top-0 flex flex-col space-y-2 bg-primary-800 p-4">
            <div>
              {t('baselinePage:baselineData')} :{' '}
              {t(`common:month.${Number(r.month)}`, {
                defaultValue: '-',
              })}
              {t('common:month.text')}
            </div>
            <div className="text-sm text-gray-300">{t('baselinePage:selectFromLeftDesc')}</div>
          </div>
          <div className="flex flex-grow flex-col space-y-2.5 rounded-b border border-t-0 border-divider py-3 px-4">
            {BASE_LINE_DETAIL_ENTRIES.map(({ key }) => (
              <div key={key} className="flex justify-between">
                <div>{t(`baselinePage:${key}`)}</div>
                <div>{baseFormatter(get(r, [key]))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
