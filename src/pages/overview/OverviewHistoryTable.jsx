import { useMemo } from 'react';

import { isNil } from 'lodash';

import Table from '../../components/table/Table';
import { useGetOverviewQuery } from '../../services/overview';

import { COLUMNS } from './OverviewTable';

export default function OverviewHistoryTable({ business, year, dimension }) {
  console.log('render');
  const option = { year, dimension };
  const { data } = useGetOverviewQuery({ business, ...option }, { skip: Object.values(option).every(isNil) });
  const columns = useMemo(() => COLUMNS({ currYear: year, lastYear: year - 1 }), [year]);
  return (
    <>
      {data && (
        <>
          <div className="w-full h-6 text-right">* 增減率 = (當年度 − 上年度) / 上年度</div>
          <div className="w-full flex flex-col shadow overflow-auto rounded-t-lg">
            <Table columns={columns} data={data?.data || []} />
          </div>
        </>
      )}
    </>
  );
}
