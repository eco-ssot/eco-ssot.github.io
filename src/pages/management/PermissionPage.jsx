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
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col rounded bg-primary-900 p-4 shadow">
        <div className="mb-6 text-xl font-medium">權限名單</div>
        <div className="grid flex-grow grid-cols-2 grid-rows-2 gap-8 overflow-auto">
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">P8廠數據可查看權限名單</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={COLUMNS} data={wzs8Users} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">後台參數可設定權限名單</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={COLUMNS} data={target_maintainer} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">開發群組名單</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={COLUMNS} data={devUsers} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">一般使用者名單</div>
              <div className="flex space-x-4">
                {isFetching && <div>Loading...</div>}
                <Toggle label="顯示全部" onChange={(e) => (e ? setMax(1000) : setMax(10))} />
              </div>
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={COLUMNS} data={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
