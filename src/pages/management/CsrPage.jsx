import { useMemo, useState, useEffect } from 'react';

import { InformationCircleIcon } from '@heroicons/react/outline';
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
import Tooltip from '../../components/tooltip/Tooltip';
import usePlantPermission from '../../hooks/usePlantPermission';
import { selectMonth, selectYear } from '../../renderless/location/locationSlice';
import useNavigate from '../../router/useNavigate';
import { useGetLatestDateQuery } from '../../services/app';
import { useGetCsrStatusQuery, usePostCsrCommentMutation } from '../../services/management';
import { ratioFormatter, statisticsFormatter } from '../../utils/formatter';
import { plantRenderer, updateMyData } from '../../utils/table';

const BUTTON_GROUP_OPTIONS = [
  { key: 'ELECTRICITY', value: 'electricity' },
  { key: 'WATER', value: 'water' },
];

const STATUS_MAPPING = {
  '-': 'bg-gray-50',
  0: 'bg-gray-50',
  1: 'bg-dangerous-700',
  2: 'bg-primary-500',
  3: 'bg-yellow-500',
};

const PERIOD = {
  WOK: { electricity: '月初到月底', water: '月初到月底', waterHint: '過年例外' },
  WTZ: { electricity: '月初到月底', water: '月初到月底', waterHint: '過年例外' },
  WKS: { electricity: '月初到月底', electricityHint: '可能假日有影響', water: '月初到月底', waterHint: '過年例外' },
  WZS: {
    electricity: '月中至月中',
    water: '25 - 24',
  },
  WCQ: {
    electricity: '14 - 13',
    electricityHint: '2月開始 : 改回月初到月底',
    water: '6 - 5',
    waterHint: '2月改成月初到月底',
  },
  WCD: {
    electricity: '27 - 26',
    water: '尚未確定',
    waterHint: '23-28號之間(先取25號)',
  },
  WIH: { electricity: '月初到月底', water: '15-14', waterHint: '(大概,有可能~20)' },
};

const csrRenderer = (cell) => {
  const status = get(cell.row.original, cell.column.id.replace('_amount', ''));
  return (
    <div className="flex items-center justify-between px-8">
      <div className={clsx('h-3 w-3 rounded-full text-center', STATUS_MAPPING[status])}></div>
      <div>{statisticsFormatter(0)(cell.value)}</div>
    </div>
  );
};

const COLUMNS = ({ t, setData, postCsrComment, isWater }) => [
  {
    Header: 'Plant',
    accessor: 'plant',
    rowSpan: 0,
    className: 'text-center whitespace-nowrap',
    Cell: plantRenderer,
  },
  {
    Header: t(`managementPage:csr.table.period`),
    rowSpan: 0,
    className: 'text-center',
    Cell: (cell) => {
      const key = isWater ? 'water' : 'electricity';
      const plant = String(cell.row.original.plant).split('-')[0].split('(')[0];
      const period = PERIOD[plant]?.[key];
      const hint = PERIOD[plant]?.[`${key}Hint`];
      return (
        <div className="flex items-center justify-center space-x-1">
          <span>{period}</span>
          {hint && (
            <Tooltip label={hint} placement="right">
              <InformationCircleIcon className="h-5 w-5" />
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    Header: t(`managementPage:csr.table.fem${isWater ? 'Water' : 'Electricity'}SmartMeter`),
    accessor: 'fem_amount',
    Cell: csrRenderer,
  },
  {
    Header: t(`managementPage:csr.table.csr${isWater ? 'Water' : 'Electricity'}Bill`),
    accessor: 'csr_amount',
    Cell: csrRenderer,
  },
  { Header: t('managementPage:csr.table.gap'), accessor: 'diff', Cell: ratioFormatter, className: 'text-right' },
  {
    Header: t('managementPage:csr.table.description'),
    accessor: 'comment',
    className: 'w-[45%] px-8 !text-left',
    editable: true,
    editableComponentProps: { className: 'text-left', wrapperClassName: 'w-full' },
  },
  {
    id: 'action',
    Header: t('managementPage:csr.table.edit'),
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
          {t('component:button.save')}
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
          <PencilIcon className="h-5 w-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function CsrPage() {
  const { t } = useTranslation(['managementPage', 'component']);
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
        t,
        isWater,
        setData,
        year,
        month,
        postCsrComment: (payload) => postCsrComment({ year: year || currYear, month: month || currMonth, ...payload }),
      }),
    [t, postCsrComment, setData, year, month, currYear, currMonth, isWater]
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setData(isWater ? data.water : data.electricity);
    }
  }, [data, isWater]);

  useEffect(() => {
    setSearchOption({ year: year || currYear, month: month || currMonth });
  }, [year, month, currYear, currMonth]);

  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-4 rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium">{t('managementPage:csr.title')}</div>
        <ButtonGroup
          className="self-center"
          options={BUTTON_GROUP_OPTIONS}
          selected={isWater ? BUTTON_GROUP_OPTIONS[1] : BUTTON_GROUP_OPTIONS[0]}
          onChange={(e) => navigate({ hash: e.key })}
        />
        <div className="flex justify-center space-x-8">
          <Select
            label={t('component:selectLabel.searchYear')}
            options={yearOptions || APP_CONSTANTS.YEAR_OPTIONS}
            selected={(yearOptions || APP_CONSTANTS.YEAR_OPTIONS).find((option) => option.key === searchOption.year)}
            onChange={(e) => setSearchOption((prev) => ({ ...prev, year: e.key }))}
            buttonClassName="min-w-28"
          />
          <Select
            label={t('component:selectLabel.searchMonth')}
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
            {t('component:button.search')}
          </Button>
        </div>
        <div className="absolute right-10">
          <div className="flex justify-end space-x-4">
            <Legend dotClassName="bg-gray-50" label={t('dataStatus.noData')} />
            <Legend dotClassName="bg-primary-500" label={t('dataStatus.updated')} />
            <Legend dotClassName="bg-dangerous-700" label={t('dataStatus.notUpdated')} />
            <Legend dotClassName="bg-yellow-500" label={t('dataStatus.incorrectData')} />
          </div>
          <div className="flex justify-end">{t('managementPage:csr.desc')}</div>
        </div>
        <div className="flex w-full flex-grow flex-col overflow-auto rounded-t-lg shadow">
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
