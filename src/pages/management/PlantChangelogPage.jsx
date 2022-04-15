import Table from '../../components/table/Table';

const COLUMNS = [
  { Header: '異動類型', accessor: 'type' },
  { Header: 'Plant', accessor: 'plant' },
  { Header: '異動後', accessor: 'after' },
  { Header: '說明', accessor: 'desc' },
  { Header: '異動日期', accessor: 'date' },
];

const DATA = [{ type: '更名', plant: 'WKS-6B', after: 'WKS', desc: '名稱調整', date: '2022-04-11' }];

export default function PlantChangelogPage() {
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col space-y-6 rounded bg-primary-900 p-4 shadow">
        <div className="text-xl font-medium">廠區異動</div>
        <div className="flex flex-col overflow-auto rounded-t-lg shadow">
          <Table columns={COLUMNS} data={DATA} />
        </div>
      </div>
    </div>
  );
}
