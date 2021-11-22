import { useState } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import { selectLanguage } from '../../renderless/location/locationSlice';

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
            setData(() =>
              setData((prev) => prev.map((r) => ({ ...r, editing: false })).filter(({ id }) => id !== 'addRow'))
            )
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

const DATA = (lng) => [
  {
    buyDate: '2020.12.29',
    unit: '344,000',
    buyArea: '中國',
    buyUnit: '188,000',
    price: '600,000',
    currency: '人民幣',
    ...(lng === 'en' && {
      buyArea: 'China',
      currency: 'CNY',
    }),
  },
  {
    buyDate: '2020.12.29',
    unit: '344,000',
    buyArea: '台灣',
    buyUnit: '0',
    price: '0',
    currency: '新台幣',
    ...(lng === 'en' && {
      buyArea: 'Taiwan',
      currency: 'NTD',
    }),
  },
  {
    buyDate: '2020.12.29',
    unit: '344,000',
    buyArea: '捷克',
    buyUnit: '156,000',
    price: '150,000',
    currency: '捷克克朗',
    ...(lng === 'en' && {
      buyArea: 'Czech Republic',
      currency: 'CZK',
    }),
  },
];

export default function Trec({ className, canEdit }) {
  const { t } = useTranslation(['managementPage', 'common', 'component']);
  const lng = useSelector(selectLanguage);
  const [data, setData] = useState(() => DATA(lng));
  const columns = COLUMNS({ t, data, setData, canEdit });
  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }

        return row;
      })
    );
  };

  return (
    <div className={clsx('w-full shadow overflow-auto rounded-t-lg space-y-2', className)}>
      <EditableTable columns={columns} data={data} updateMyData={updateMyData} setData={setData} />
    </div>
  );
}
