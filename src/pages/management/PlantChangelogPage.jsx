import { useMemo } from 'react';

import Table from '../../components/table/Table';
import { useGetPlantChangelogQuery } from '../../services/public';

const COLUMNS = [
  { Header: '異動類型', accessor: 'type' },
  { Header: 'Plant', accessor: 'plant' },
  { Header: '異動後', accessor: 'after' },
  { Header: '說明', accessor: 'desc' },
  { Header: '異動日期', accessor: 'date' },
];

export default function PlantChangelogPage() {
  const { data } = useGetPlantChangelogQuery();
  const columns = useMemo(() => COLUMNS, []);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-6 rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium">廠區異動</div>
        <div className="flex flex-col overflow-auto rounded-t-lg shadow">
          <Table columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  );
}
