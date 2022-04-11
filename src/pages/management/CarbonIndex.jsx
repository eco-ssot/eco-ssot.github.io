import { useEffect, useState } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import { usePatchCarbonIndexMutation } from '../../services/management';
import { baseFormatter } from '../../utils/formatter';
import { updateMyData } from '../../utils/table';

const COLUMNS = ({ t, setData, patchCarbonIndex, year, canEdit }) => [
  {
    Header: 'Site',
    accessor: 'site',
    className: 'w-1/3 text-center py-3',
  },
  {
    Header: t('managementPage:carbonIndex.table.amount'),
    accessor: 'amount',
    editable: true,
    className: 'w-1/3 text-center',
    formatter: baseFormatter,
    precision: 4,
  },
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-1/3 text-center',
    Cell: (cell) => {
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            const { id, editing, lastUpdateTime, site, ...rest } = cell.row.original;
            patchCarbonIndex({ id, year, data: rest });
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
          <PencilIcon className="h-5 w-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function CarbonIndex({ className, year, data, canEdit }) {
  const { t } = useTranslation(['managementPage', 'component']);
  const [patchCarbonIndex] = usePatchCarbonIndexMutation();
  const [dataSource, setData] = useState(data);
  const columns = COLUMNS({ t, setData, patchCarbonIndex, year, canEdit });
  useEffect(() => {
    data && setData(data);
  }, [data]);

  return (
    <div className={clsx('w-full space-y-2 overflow-auto rounded-t-lg shadow', className)}>
      <EditableTable columns={columns} data={dataSource} updateMyData={updateMyData(setData)} />
    </div>
  );
}
