import { useEffect, useState, useRef, useMemo } from 'react';

import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import APP_CONSTANTS from '../../app/appConstants';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
  TextareaCell,
} from '../../components/table/EditableTable';
import useAdmin from '../../hooks/useAdmin';
import {
  useGetElectricityPowerSavingQuery,
  usePatchElectricityPowerSavingMutationMutation,
  usePostElectricityPowerSavingMutationMutation,
} from '../../services/electricity';
import { useGetUsersQuery } from '../../services/keycloakAdmin';
import { baseFormatter } from '../../utils/formatter';
import { trimNumber } from '../../utils/number';
import { updateMyData } from '../../utils/table';

import ConfirmModal from './ConfirmModal';

const POWER_SAVING_COLUMNS = ({
  t,
  year,
  plant,
  electricityOptions,
  setData,
  userOptions,
  postPowerSaving,
  setOpen,
  canEdit,
}) => [
  {
    Header: t('baselinePage:powerSaving.table.electricityType'),
    accessor: 'category',
    rowSpan: 0,
    className: 'w-[6%] text-center',
    editable: true,
    EditableComponent: ({ defaultValue, onBlur }) => (
      <Select
        strategy="fixed"
        className="text-left"
        options={electricityOptions}
        selected={electricityOptions.find((option) => option.value === defaultValue)}
        onChange={(e) => onBlur(e.value)}
      />
    ),
    defaultRenderer: (value) => t(`baselinePage:powerSaving.table.${value}`),
  },
  {
    Header: t('baselinePage:powerSaving.table.action'),
    accessor: 'modified_method',
    className: 'w-[8%] text-center',
    rowSpan: 0,
    editable: true,
    editableComponentProps: { className: 'text-left h-10' },
  },
  {
    id: 'expect',
    Header: <div className="border-b border-divider py-3">{t('baselinePage:powerSaving.table.expectedValue')}</div>,
    columns: Array.from({ length: 12 }, (_, i) => ({
      Header: `${t(`common:month.${i + 1}月`)}`,
      accessor: `expected_benefits.${i + 1}`,
      editable: true,
      className: '!px-1 w-[4%] text-right',
      formatter: baseFormatter,
      editableComponentProps: { className: 'text-right h-10' },
    })).concat({
      id: 'total',
      Header: t('baselinePage:powerSaving.table.total'),
      className: '!px-1 w-[4%] text-right',
      Cell: (cell) => {
        const ttl = Object.entries(cell.row.original.expected_benefits || {}).reduce(
          (prev, curr) => prev + trimNumber(curr[1]),
          0
        );

        return baseFormatter(ttl);
      },
    }),
  },
  {
    Header: 'PIC',
    accessor: 'pic',
    rowSpan: 0,
    className: 'w-[8%] text-center',
    Cell: (cell) =>
      cell.row.original.editing ? (
        <AdSearchSelectCell
          options={userOptions}
          defaultValue={{ value: cell.row.original.pic, label: cell.row.original.pic }}
          onBlur={(e) => {
            e.label && setData((prev) => prev.map((d, i) => (cell.row.index === i ? { ...d, pic: e.label } : d)));
          }}
        />
      ) : (
        cell.value || ''
      ),
  },
  {
    Header: t('baselinePage:powerSaving.table.calculation'),
    accessor: 'computational_logic',
    rowSpan: 0,
    editable: true,
    EditableComponent: TextareaCell,
    className: 'w-[10%] py-2',
  },
  {
    Header: t('baselinePage:powerSaving.table.remark'),
    accessor: 'remark',
    rowSpan: 0,
    editable: true,
    EditableComponent: TextareaCell,
    className: 'w-[10%]',
  },
  {
    id: 'action',
    Header: t('baselinePage:powerSaving.table.edit'),
    className: 'w-[5%] text-center',
    rowSpan: 0,
    Cell: (cell) => {
      const [patchPowerSaving] = usePatchElectricityPowerSavingMutationMutation();
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const {
              id,
              modified,
              isNew,
              editing,
              expected_benefits = {},
              category = electricityOptions[0].value,
              ...rest
            } = cell.row.original;

            const payload = {
              category,
              expected_benefits: Object.entries(expected_benefits).reduce(
                (prev, [key, value]) => ({
                  ...prev,
                  [key]: trimNumber(value),
                }),
                Array.from({ length: 12 }, (_, i) => i).reduce((_prev, _curr) => ({ ..._prev, [_curr + 1]: 0 }), {})
              ),
              ...rest,
            };

            if (id !== undefined) {
              patchPowerSaving({ year, plant, data: payload });
              setData((prev) => prev.map((r, i) => (i === cell.row.index ? { ...r, editing: false } : r)));
            } else {
              postPowerSaving(payload);
              setOpen(true);
            }
          }}>
          {t('component:button.save')}
        </EditableButton>
      ) : (
        <EditableIconButton
          disabled={!cell.row.original.by_copy && !canEdit}
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                ...(i === cell.row.index && { editing: true }),
              }))
            )
          }>
          <PencilIcon className="h-5 w-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function PowerSavingPanel({ year, plant }) {
  const { t } = useTranslation(['component', 'baselinePage', 'common']);
  const { data } = useGetElectricityPowerSavingQuery({ year, plant }, { skip: !year || !plant });
  const { data: users = [] } = useGetUsersQuery();
  const [_data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [postPowerSaving] = usePostElectricityPowerSavingMutationMutation();
  const { canEdit } = useAdmin();
  const confirmRef = useRef({});
  const electricityOptions = useMemo(
    () =>
      APP_CONSTANTS.ELECTRICITY_OPTIONS.map((option) => ({
        ...option,
        value: t(`component:electricityOptions.${option.key}`),
      })),
    [t]
  );

  const columns = useMemo(
    () =>
      POWER_SAVING_COLUMNS({
        t,
        year,
        plant,
        electricityOptions,
        setOpen,
        setData,
        canEdit,
        userOptions: users.map(({ id, email }) => ({ value: id, label: email })),
        postPowerSaving: (payload) => (confirmRef.current = { year, plant, data: payload }),
      }),
    [t, electricityOptions, year, plant, users, canEdit]
  );

  useEffect(() => {
    data && setData(data.data);
  }, [data]);

  if (isNil(_data)) {
    return null;
  }

  return (
    <>
      <Button
        className="absolute right-8 top-44 translate-y-1"
        onClick={() =>
          setData((prev) => (prev.slice(-1)[0]?.isNew ? prev.slice(0, -1) : [...prev, { isNew: true, editing: true }]))
        }>
        {_data?.slice(-1)?.[0]?.isNew ? (
          <>
            <XIcon className="h-5 w-5" /> {t('component:button.cancel')}
          </>
        ) : (
          <>
            <PlusIcon className="h-5 w-5" /> {t('baselinePage:powerSaving.addNewAction')}
          </>
        )}
      </Button>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          postPowerSaving(confirmRef.current).then(() => {
            setData((prev) => prev.map((d) => (d.isNew ? { ...confirmRef.current.data, isNew: false } : d)));
            confirmRef.current = {};
          });
        }}
        onCancel={() => (confirmRef.current = {})}
      />
      <div className="relative col-span-5 flex h-full w-full flex-col overflow-auto rounded-t-lg shadow">
        <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} />
      </div>
    </>
  );
}
