import { useMemo, useState } from 'react';

import { UserAddIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';

import Button from '../../components/button/Button';
import Dialog from '../../components/dialog/Dialog';
import AdSearchSelect from '../../components/select/AdSearchSelect';
import BaseReactSelect from '../../components/select/BaseReactSelect';
import Table from '../../components/table/Table';
import Toggle from '../../components/toggle/Toggle';
import { useGetUserListQuery } from '../../services/auth';

const COLUMNS = [
  { Header: 'Name', accessor: 'first_name' },
  { Header: 'Email', accessor: 'email' },
];

const ROLES = [
  { label: 'p8', value: 'p8', alias: 'WZS-8' },
  { label: 'management', value: 'management', alias: 'target_maintainer' },
  { label: 'dev', value: 'dev', alias: 'DEV' },
  { label: 'normal', value: 'normal', alias: 'developer' },
];

function UserForm() {
  return (
    <Dialog
      render={({ close }) => (
        <>
          <div className="flex h-full flex-col space-y-4 rounded-b bg-primary-900 p-8 shadow">
            <div className="flex items-center">
              <div className="min-w-32">Email : </div>
              <AdSearchSelect className="w-full" placeholder="Type to search" />
            </div>
            <div className="flex items-center">
              <div className="min-w-32">Roles : </div>
              <BaseReactSelect
                isMulti
                className="w-full"
                placeholder="Select roles"
                options={ROLES}
                closeMenuOnSelect={false}
                onSelectResetsInput={false}
                onChange={(e) => console.log({ e })}
              />
            </div>
            <div className="flex flex-grow flex-col justify-end">
              <div className="flex justify-end space-x-4">
                <Button variant="plain" onClick={close}>
                  Cancel
                </Button>
                <Button>OK</Button>
              </div>
            </div>
          </div>
        </>
      )}
      title="Add User"
      className="h-64 max-w-2xl"
      titleClassName="bg-primary-800 px-4 py-2 rounded-t"
    >
      <Button className="space-x-1">
        <UserAddIcon className="h-5 w-5" />
        <div>Add User</div>
      </Button>
    </Dialog>
  );
}

export default function PermissionPage() {
  const { t } = useTranslation(['managementPage']);
  const [max, setMax] = useState(10);
  const { data } = useGetUserListQuery();
  const columns = useMemo(() => COLUMNS, []);
  return (
    <div className="col-span-7 row-span-2">
      <div className="flex h-full flex-col rounded bg-primary-900 p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="mb-6 text-xl font-medium">{t('managementPage:permission.permissionList')}</div>
          <UserForm />
        </div>
        <div className="grid flex-grow grid-cols-2 grid-rows-2 gap-8 overflow-auto">
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">
              {t('managementPage:permission.checkingPermissionListOfSiteP8Data')}
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.p8} />}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">{t('managementPage:permission.editingPermissionListOfSettings')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.management} />}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-medium">{t('managementPage:permission.listOfDevelopmentTeam')}</div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.dev} />}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">{t('managementPage:permission.userList')}</div>
              <div className="flex space-x-4">
                <Toggle label={t('common:showAll')} onChange={(e) => (e ? setMax(1000) : setMax(10))} />
              </div>
            </div>
            <div className="mb-1 flex flex-grow flex-col overflow-auto rounded-t-lg shadow">
              {data && <Table columns={columns} data={data.normal?.slice(0, max)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
