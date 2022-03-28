import { useMemo } from 'react';

import Table from '../../components/table/Table';
import { useGetUsersByRoleQuery } from '../../services/keycloakAdmin';

const COLUMNS = [
  { Header: 'Name', accessor: 'firstName' },
  { Header: 'Email', accessor: 'email' },
];

export default function PermissionPage() {
  const { data: wzs8Users = [] } = useGetUsersByRoleQuery({ roleName: 'WZS-8' });
  const { data: devUsers = [] } = useGetUsersByRoleQuery({ roleName: 'DEV' });
  const { data: target_maintainer = [] } = useGetUsersByRoleQuery({ roleName: 'target_maintainer' });
  const columns = useMemo(() => COLUMNS, []);
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full">
        <div className="text-xl font-medium mb-6">權限管理</div>
        <div className="flex space-x-8 mb-2">
          <div className="w-1/2 text-xl font-medium">P8廠數據可查看權限名單</div>
          <div className="w-1/2 text-xl font-medium">後台參數可設定權限名單</div>
        </div>
        <div className="flex overflow-auto space-x-8 ">
          <div className="flex w-1/2">
            <div className="flex flex-col flex-grow rounded-t-lg mb-1 overflow-auto shadow">
              <Table columns={columns} data={[...wzs8Users, ...devUsers]} />
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="flex flex-col flex-grow rounded-t-lg mb-1 overflow-auto shadow">
              <Table columns={columns} data={target_maintainer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
