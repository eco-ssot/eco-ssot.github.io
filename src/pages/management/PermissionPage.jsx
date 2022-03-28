import { useState } from 'react';

import Table from '../../components/table/Table';
import Toggle from '../../components/toggle/Toggle';
import { useGetUsersByRoleQuery, useGetUsersQuery } from '../../services/keycloakAdmin';

const COLUMNS = [
  { Header: 'Name', accessor: 'firstName' },
  { Header: 'Email', accessor: 'email' },
];

export default function PermissionPage() {
  const [max, setMax] = useState(10);
  const { data: wzs8Users = [] } = useGetUsersByRoleQuery({ roleName: 'WZS-8' });
  const { data: devUsers = [] } = useGetUsersByRoleQuery({ roleName: 'DEV' });
  const { data: target_maintainer = [] } = useGetUsersByRoleQuery({ roleName: 'target_maintainer' });
  const { isFetching, data: users = [] } = useGetUsersQuery({ max });
  return (
    <div className="row-span-2 col-span-7">
      <div className="flex flex-col bg-primary-900 rounded shadow p-4 h-full">
        <div className="text-xl font-medium mb-6">權限名單</div>
        <div className="grid grid-cols-2 grid-rows-2 flex-grow overflow-auto gap-8">
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">P8廠數據可查看權限名單</div>
            <div className="flex flex-col flex-grow rounded-t-lg mb-1 overflow-auto shadow">
              <Table columns={COLUMNS} data={wzs8Users} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">後台參數可設定權限名單</div>
            <div className="flex flex-col flex-grow rounded-t-lg mb-1 overflow-auto shadow">
              <Table columns={COLUMNS} data={target_maintainer} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">開發群組名單</div>
            <div className="flex flex-col flex-grow rounded-t-lg mb-1 overflow-auto shadow">
              <Table columns={COLUMNS} data={devUsers} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xl font-medium">一般使用者名單</div>
              <div className="flex space-x-4">
                {isFetching && <div>Loading...</div>}
                <Toggle label="顯示全部" onChange={(e) => (e ? setMax(1000) : setMax(10))} />
              </div>
            </div>
            <div className="flex flex-col flex-grow rounded-t-lg mb-1 overflow-auto shadow">
              <Table columns={COLUMNS} data={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
