import { useState, useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import EditableTable, {
  CustomInputCell,
  EditableButton,
  EditableIconButton,
} from '../../components/table/EditableTable';
import { usePatchGoalMutation } from '../../services/app';
import { baseFormatter } from '../../utils/formatter';
import { getDecimalNumber } from '../../utils/number';

import ErrorModal from './ErrorModal';

const DICTIONARY = {
  碳排放量: 'Carbon Emission',
  可再生能源: 'Renewable Energy',
  用電強度: 'Electricity Consumption Intensity',
  用水強度: 'Water Consumption Intensity',
  單台用電: 'Electricity Consumption per Product',
  廢棄物密度: 'Waste Generation Intensity',
  公噸: 'Ton',
  '千度 / 十億新台幣': 'MWh / billion NTD',
  '千噸 / 十億新台幣': 'Kiloton / billion NTD',
  '度 / 台': 'kWh / product',
  '公噸 / 十億新台幣': 'Ton / billion NTD',
};

const COLUMNS = ({ t, lng, setData, year, patchGoal, canEdit, setOpen }) => [
  {
    Header: t('managementPage:yearGoal.table.category'),
    accessor: 'category',
    className: 'w-[18%] text-center py-3',
    ...(lng === 'en' && {
      Cell: (cell) => DICTIONARY[cell.value] || cell.value,
    }),
  },
  {
    Header: t('managementPage:yearGoal.table.baseYear'),
    accessor: 'baseYear',
    editable: true,
    className: 'w-[18%] text-center',
  },
  {
    lng,
    Header: t('managementPage:yearGoal.table.target'),
    accessor: 'target',
    editable: true,
    className: 'w-[18%] text-center',
    EditableComponent: (cell) => CustomInputCell({ ...cell, lng }),
  },
  {
    Header: `${year} Target`,
    accessor: 'amount',
    className: 'w-[18%] text-center',
    formatter: baseFormatter,
    precision: 1,
  },
  {
    Header: t('managementPage:yearGoal.table.unit'),
    accessor: 'unit',
    className: 'w-[18%] text-center',
    ...(lng === 'en' && {
      Cell: (cell) => DICTIONARY[cell.value] || cell.value,
    }),
  },
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-[10%] text-center',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { baseYear, target, category } = cell.row.original;
            if (Number(baseYear) >= Number(year) || Number(getDecimalNumber(target)) > 100) {
              return setOpen(true);
            }

            patchGoal({ year, baseYear, target, category });
            return setData((prev) =>
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
          disabled={!canEdit}
          onClick={() =>
            setData((prev) =>
              prev.map((r, i) => ({
                ...r,
                editing: i === cell.row.index,
                ...(i !== cell.row.index && { editing: r.editing || false }),
              }))
            )
          }>
          <PencilIcon className="w-5 h-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function YearGoal({ className, year, data, canEdit }) {
  const { t, i18n } = useTranslation(['managementPage', 'common', 'component']);
  const [patchGoal] = usePatchGoalMutation();
  const [dataSource, setData] = useState(data);
  const [open, setOpen] = useState(false);
  const columns = COLUMNS({ t, setData, patchGoal, setOpen, year, canEdit, lng: i18n.resolvedLanguage });
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

  useEffect(() => data && setData(data), [data]);
  return (
    <>
      <ErrorModal open={open} setOpen={setOpen} />
      <div className={clsx('w-full shadow overflow-auto rounded-t-lg space-y-2', className)}>
        <EditableTable columns={columns} data={dataSource} updateMyData={updateMyData} />
      </div>
    </>
  );
}
