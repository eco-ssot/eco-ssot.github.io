import { useState, useMemo, useEffect } from 'react';

import { PencilIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import EditableTable, { EditableButton, EditableIconButton } from '../../components/table/EditableTable';
import useAdmin from '../../hooks/useAdmin';
import { useGetDecarbonizationQuery } from '../../services/decarbonization';
import { toFormattedNumber } from '../../utils/number';
import { updateMyData } from '../../utils/table';
const COLUMNS = ({ t, canEdit, setData, yearOrder }) => [
  {
    Header: t('decarbonizationPage:category'),
    accessor: 'item',
    className: 'text-left p-3',
    Cell: (cell) => {
      if (cell.value === '總電量') {
        const titleUrl = '/electricity';
        return (
          <Link to={titleUrl} className="decoration-white-600 cursor-pointer underline underline-offset-4">
            {cell.value}
          </Link>
        );
      } else if (cell.value === '碳排放') {
        const titleUrl = '/carbon';
        return (
          <Link to={titleUrl} className="decoration-white-600 cursor-pointer underline underline-offset-4">
            {cell.value}
          </Link>
        );
      } else if (cell.value === '節能耗電') {
        const titleUrl = '/analysis/electricity#POWER_SAVING';
        return (
          <Link to={titleUrl} className="decoration-white-600 cursor-pointer underline underline-offset-4">
            {cell.value}
          </Link>
        );
      } else if (cell.value === '可再生能源') {
        const titleUrl = '/renewable-energy';
        return (
          <Link to={titleUrl} className="decoration-white-600 cursor-pointer underline underline-offset-4">
            {cell.value}
          </Link>
        );
      } else {
        const titleUrl = '';
        return <Link to={titleUrl}>{cell.value}</Link>;
      }
    },
  },
  { Header: t('decarbonizationPage:base'), accessor: 'main', className: 'text-left p-3' },
  { Header: t('decarbonizationPage:detail'), accessor: 'detail', className: 'text-left p-3' },
 
  ...yearOrder?.map((year) => {
    return {
      Header: year.replace('12', t('decarbonizationPage:year')),
      accessor: String(year),
      // id:  year,
      className: 'text-right p-3',
      rowSpan: 0,
      Cell: (cell) => {
        return toFormattedNumber(cell.value.amount, cell.value.unit ? { suffix: cell.value.unit, precision: 1 } : '');
      },
    };
  }),
  {
    Header: t('common:edit'),
    id: 'action',
    className: 'w-[10%] text-center whitespace-nowrap',
    rowSpan: 0,
    Cell: (cell) => {
      //   const [patchVersion] = usePatchVersionMutation();
      return cell.row.original.editing ? (
        <EditableButton
          onClick={() => {
            // const { editing, ...rest } = cell.row.original;
            // patchVersion(rest);
            // return setData((prev) =>
            //   prev.map((r, i) => ({
            //     ...r,
            //     ...(i === cell.row.index && { editing: false }),
            //   }))
            // );
          }}
        >
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
          }
        >
          <PencilIcon className="h-5 w-5" />
        </EditableIconButton>
      );
    },
  },
];

export default function DecarbonizationPage() {
  const { t } = useTranslation(['decarbonizationPage', 'common', 'component']);
  const { canEdit } = useAdmin();
  const { data: { data } = {} } = useGetDecarbonizationQuery();
  const [_data, setData] = useState(data);
  const yearOrder = useMemo(() => [data?(data?.map((data) =>
    Object.keys(data)
      ?.filter(function (value) {
        return value >= 202212;
      })
      ?.sort((a, b) => a.localeCompare(b))
  )[0]):[]], [data])[0]
  const columns = useMemo(() => COLUMNS({ t, canEdit, setData, yearOrder }), [t, canEdit, yearOrder]);
  useEffect(() => {
    data && setData(data);
  }, [data]);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-6 rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium">{t('managementPage:decarbonization.title')}</div>
        <div className="flex flex-col overflow-auto rounded-t-lg shadow">
          <EditableTable columns={columns} data={_data} updateMyData={updateMyData(setData)} decarbon={"decarbon"}/>
        </div>
      </div>
    </div>
  );
}
