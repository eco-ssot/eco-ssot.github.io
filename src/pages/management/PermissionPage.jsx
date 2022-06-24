import { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Table from '../../components/table/Table';
import Toggle from '../../components/toggle/Toggle';
import { useGetUsersByRoleQuery, useGetUsersQuery } from '../../services/keycloakAdmin';

const COLUMNS = [
  { Header: 'Name', accessor: 'firstName' },
  { Header: 'Email', accessor: 'email' },
];

export default function PermissionPage() {
  const { t } = useTranslation(['managementPage']);
  const [max, setMax] = useState(10);
  const { data: wzs8Users = [] } = useGetUsersByRoleQuery({ roleName: 'WZS-8' });
  const { data: devUsers = [] } = useGetUsersByRoleQuery({ roleName: 'DEV' });
  const { data: target_maintainer = [] } = useGetUsersByRoleQuery({ roleName: 'target_maintainer' });
  const { isFetching, data: users = [] } = useGetUsersQuery({ max });
  const columns = useMemo(() => COLUMNS, []);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col rounded bg-primary-900 p-4 shadow">
        <div className="mb-6 text-xl font-medium">{t('managementPage:permission.permissionList')}</div>
        <div className="grid flex-grow grid-cols-2 grid-rows-2 gap-8 overflow-auto">
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">
              {t('managementPage:permission.checkingPermissionListOfSiteP8Data')}
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={columns} data={wzs8Users} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">{t('managementPage:permission.editingPermissionListOfSettings')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={columns} data={target_maintainer} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">{t('managementPage:permission.listOfDevelopmentTeam')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={columns} data={devUsers} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">{t('managementPage:permission.userList')}</div>
              <div className="flex space-x-4">
                {isFetching && <div>Loading...</div>}
                <Toggle label={t('common:showAll')} onChange={(e) => (e ? setMax(1000) : setMax(10))} />
              </div>
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              <Table columns={columns} data={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
