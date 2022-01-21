import { useEffect, useState, useMemo } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import { selectLanguage } from '../../renderless/location/locationSlice';
import { baseFormatter } from '../../utils/formatter';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, setData, canEdit, data = [] }) => [
  {
    Header: t('managementPage:tRec.table.buyDate'),
    accessor: 'buyDate',
    rowSpan: data.length || 1,
    className: 'w-[15%] text-center',
    editable: true,
  },
  {
    Header: t('managementPage:tRec.table.unit'),
    accessor: 'unit',
    rowSpan: data.length || 1,
    className: 'w-[15%] text-center',
    editable: true,
  },
  {
    Header: t('managementPage:tRec.table.buyArea'),
    accessor: 'buyArea',
    className: 'w-[15%] text-center py-2',
    editable: true,
    placeholder: '地區',
  },
  {
    Header: t('managementPage:tRec.table.buyUnit'),
    accessor: 'buyUnit',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '張數',
  },
  {
    Header: t('managementPage:tRec.table.price'),
    accessor: 'price',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '價格',
  },
  {
    Header: t('managementPage:tRec.table.currency'),
    accessor: 'currency',
    className: 'w-[15%] text-center',
    editable: true,
    placeholder: '幣別',
  },
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-[10%] text-center',
    rowSpan: data.length || 1,
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() =>
            setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'))
          }>
          {t('component:button.save')}
        </EditableButton>
      ) : (
        <EditableIconButton
          onClick={() =>
            setData((prev) =>
              prev
                .map((r) => ({ ...r, editing: true }))
                .filter(({ id }) => id !== 'addRow')
                .concat({ id: 'addRow', colSpan: 4, startIndex: 2 })
            )
          }
          disabled={!canEdit}>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
      );
    },
  },
];

const COLUMNS_BY_SITE = ({ setData }) => [
  {
    Header: 'Site',
    accessor: 'site',
    className: 'text-center',
  },
  {
    Header: (header) => {
      const isEditing = header.data.some(({ editing }) => editing);
      return (
        <div className="flex space-x-2 justify-end items-center">
          <div>綠證</div>
          {isEditing ? (
            <EditableButton onClick={() => setData((prev) => prev.map((d) => ({ ...d, editing: false })))}>
              儲存
            </EditableButton>
          ) : (
            <EditableIconButton onClick={() => setData((prev) => prev.map((d) => ({ ...d, editing: true })))}>
              <PencilIcon className="w-5 h-5" />
            </EditableIconButton>
          )}
        </div>
      );
    },
    accessor: 'value',
    className: 'text-right pr-4 py-2',
    editable: true,
    formatter: baseFormatter,
    editableComponentProps: { className: 'text-left' },
  },
];

const DATA = (lng) => [
  {
    buyDate: '2021.12.24',
    unit: '200,517',
    buyArea: '中國',
    buyUnit: '200,517',
    price: '620,641',
    currency: '人民幣',
    ...(lng === 'en' && {
      buyArea: 'China',
      currency: 'CNY',
    }),
  },
  // {
  //   buyDate: '2020.12.29',
  //   unit: '344,000',
  //   buyArea: '台灣',
  //   buyUnit: '0',
  //   price: '0',
  //   currency: '新台幣',
  //   ...(lng === 'en' && {
  //     buyArea: 'Taiwan',
  //     currency: 'NTD',
  //   }),
  // },
  // {
  //   buyDate: '2020.12.29',
  //   unit: '344,000',
  //   buyArea: '捷克',
  //   buyUnit: '156,000',
  //   price: '150,000',
  //   currency: '捷克克朗',
  //   ...(lng === 'en' && {
  //     buyArea: 'Czech Republic',
  //     currency: 'CZK',
  //   }),
  // },
];

const DATA_BY_SITE = [
  { site: 'WKS', value: 19009837 },
  { site: 'WOK', value: 26786129 },
  { site: 'WTZ', value: 18163901 },
  { site: 'WZS', value: 61511384 },
  { site: 'WCD', value: 20795157 },
  { site: 'WCQ', value: 7729877 },
  { site: 'WIH', value: 9550922 },
  { site: 'WCZ', value: 3372709 },
  { site: 'WMX', value: 8156708 },
  { site: 'Wiwynn', value: 15275268 },
  { site: 'WNH', value: 3600284 },
  { site: 'WNH', value: 6564824 },
];

export default function Trec({ className, canEdit }) {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const lng = useSelector(selectLanguage);
  const [data, setData] = useState(DATA(lng));
  const [dataBySite, setDataBySite] = useState(DATA_BY_SITE);
  const columns = useMemo(() => COLUMNS({ t, setData, data, canEdit }), [t, data, canEdit]);
  const columnsBySite = useMemo(() => COLUMNS_BY_SITE({ setData: setDataBySite }), []);
  useEffect(() => setData(DATA(lng)), [lng]);
  return (
    <div className="grid grid-cols-4 gap-4 h-full overflow-auto">
      <div className={clsx('col-span-3 flex flex-col shadow overflow-auto rounded-t-lg', className)}>
        <EditableTable columns={columns} data={data} updateMyData={updateMyData(setData)} setData={setData} />
      </div>
      <div className={clsx('col-span-1 flex flex-col shadow overflow-auto rounded-t-lg', className)}>
        <EditableTable
          columns={columnsBySite}
          data={dataBySite}
          updateMyData={updateMyData(setDataBySite)}
          setData={setDataBySite}
        />
      </div>
    </div>
  );
}
